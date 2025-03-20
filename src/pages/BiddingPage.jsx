import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, Loader, CheckCircle } from "lucide-react";
import { cropService, bidService, userService } from "../api";
import cropPlaceholder from "../images/crop.jpeg";

const BiddingPage = () => {
  const { cropId } = useParams();
  const [crop, setCrop] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [user, setUser] = useState(null);
  const [isLoadingBids, setIsLoadingBids] = useState(true);
  const [acceptedBidId, setAcceptedBidId] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userService.getProfile();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchCropDetails = async () => {
      try {
        const response = await cropService.getCropById(cropId);
        setCrop(response.data);
      } catch (error) {
        console.error("Error fetching crop details:", error);
      }
    };

    const fetchBids = async () => {
      setIsLoadingBids(true);
      try {
        const response = await bidService.getBidsByCrop(cropId);
        setBids(response.data);

        // Find the accepted bid and update state
        const acceptedBid = response.data.find((bid) => bid.status === "ACCEPTED");
        if (acceptedBid) {
          setAcceptedBidId(acceptedBid.id);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
      setIsLoadingBids(false);
    };

    fetchUserProfile();
    fetchCropDetails();
    fetchBids();
  }, [cropId]);

  if (!crop || !user) return <p>Loading...</p>;

  const isSeller = user.id === crop.sellerId;
  const isCompleted = new Date(crop.endDate) < new Date(); // Check if bidding is closed

  const handlePlaceBid = async () => {
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= crop.minBid) {
      alert(`Bid must be higher than ₹${crop.minBid}`);
      return;
    }

    try {
      const bidData = { amount: parseFloat(bidAmount), cropId: crop.id };
      await bidService.placeBid(bidData);

      setBidAmount(""); // Clear input
      setBids((prevBids) => [
        { id: Date.now(), amount: bidAmount, bidderName: user.name, status: "PENDING" },
        ...prevBids,
      ]);
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid. Please try again.");
    }
  };

  const handleAcceptBid = async (bidId) => {
    if (!window.confirm("Are you sure you want to accept this bid? Once accepted, no other bid can be chosen.")) return;

    try {
      await bidService.acceptBid(bidId);
      setAcceptedBidId(bidId);
      setBids((prevBids) =>
        prevBids.map((bid) =>
          bid.id === bidId ? { ...bid, status: "ACCEPTED" } : { ...bid, status: "REJECTED" }
        )
      );
    } catch (error) {
      console.error("Error accepting bid:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Crop Details */}
      <div className="space-y-6">
        <img
          src={crop.imageBase64 || cropPlaceholder}
          alt={crop.name}
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{crop.name}</h1>
          <p className="text-gray-600">Listed by {crop.sellerName}</p>
          <p className="text-gray-600">{crop.description}</p>
          <p className="text-gray-600">Quantity: {crop.quantity} {crop.unit}</p>
          <p className="text-gray-600">Minimum Bid: ₹{crop.minBid}/{crop.unit}</p>
        </div>
      </div>

      {/* Bidding Section */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isCompleted ? "Bidding Closed" : "Current Highest Bid"}
          </h2>
          <p className="text-3xl font-bold text-green-600">
            ₹{bids.length > 0 ? bids[0].amount : crop.minBid}/{crop.unit}
          </p>
          <div className="flex items-center space-x-2 text-orange-600">
            <Clock className="h-5 w-5" />
            <span>
              {isCompleted ? "Bidding has ended" : `Ends in ${Math.ceil((new Date(crop.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days`}
            </span>
          </div>
          <p className="text-gray-600">{bids.length} bids placed</p>
        </div>

        {/* Winning Bid Section */}
        {acceptedBidId && (
          <div className="bg-green-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-800">Winning Bid</h3>
            <p className="text-lg font-semibold text-gray-700">
              {bids.find((bid) => bid.id === acceptedBidId)?.bidderName}
            </p>
            <p className="text-2xl font-bold text-green-600">
              ₹{bids.find((bid) => bid.id === acceptedBidId)?.amount}/{crop.unit}
            </p>
          </div>
        )}

        {/* Bid Placement for Buyers (Not Sellers) */}
        {!isCompleted && !isSeller && (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Place a Bid</h3>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              placeholder={`Enter bid amount (min ₹${crop.minBid})`}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <button
              onClick={handlePlaceBid}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
            >
              Submit Bid
            </button>
          </div>
        )}

        {/* Bid History with Accept Button for Seller */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Bid History</h3>
          {isLoadingBids ? (
            <div className="flex justify-center items-center space-x-2 text-gray-500">
              <Loader className="animate-spin h-5 w-5" />
              <span>Loading bids...</span>
            </div>
          ) : bids.length > 0 ? (
            bids.map((bid) => (
              <div key={bid.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <p className="text-gray-800">{bid.bidderName}</p>
                <p className="font-semibold">₹{bid.amount}/{crop.unit}</p>
                {isSeller && !acceptedBidId && !isCompleted && bid.status === "PENDING" && (
                  <button onClick={() => handleAcceptBid(bid.id)} className="text-green-600 font-bold hover:underline">
                    Accept
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bids yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
