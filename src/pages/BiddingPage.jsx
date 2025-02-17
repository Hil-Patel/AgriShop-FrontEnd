import React, { useState } from 'react';
import { Clock, AlertCircle, ArrowUp } from 'lucide-react';
import cropimage from '../images/crop.jpeg'
import farmerimage from '../images/farmer.jpeg'
const BiddingPage = () => {
  const currentHighestBid = 3200;
  const minimumBid = currentHighestBid + 100;
  
  const [bidAmount, setBidAmount] = useState(minimumBid);
  const [isBidTooLow, setIsBidTooLow] = useState(false);

  const handleBidChange = (e) => {
    const value = parseInt(e.target.value, 10) || "";
    setBidAmount(value);
    setIsBidTooLow(value !== "" && value < minimumBid);
  };

  const handleBid = (e) => {
    e.preventDefault();
    if (isBidTooLow) return; // Prevents submission if bid is too low
    console.log('Bid submitted:', bidAmount);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Crop Details */}
      <div className="space-y-6">
        <img
          src={cropimage}
          alt="Crop"
          className="w-full h-80 object-cover rounded-lg"
        />
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Premium Wheat</h1>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <img
              src={farmerimage}
              alt="Farmer"
              className="w-10 h-10 rounded-full"
            />
            <span>Listed by Dhyey Patel</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-gray-600">
              High-quality organic wheat harvested from our sustainable farm. 
              Perfect for premium flour production and baking needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Quantity Available</h3>
              <p className="text-gray-600">100 quintals</p>
            </div>
            <div>
              <h3 className="font-semibold">Minimum Bid</h3>
              <p className="text-gray-600">₹2,500/quintal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Bidding Section */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Current Highest Bid</h2>
              <p className="text-3xl font-bold text-green-600">₹{currentHighestBid}/quintal</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-orange-600">
                <Clock className="h-5 w-5" />
                <span>Ends in 2 days</span>
              </div>
              <p className="text-gray-600">15 bids placed</p>
            </div>
          </div>

          <form onSubmit={handleBid} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Your Bid (per quintal)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={handleBidChange}
                  className="w-full pl-8 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter bid amount"
                  required
                />
              </div>
            </div>

            {isBidTooLow && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <p className="text-sm text-orange-700">
                  Your bid must be at least ₹{minimumBid} or higher.
                </p>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                isBidTooLow
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              disabled={isBidTooLow}
            >
              <ArrowUp className="h-5 w-5" />
              <span>Place Bid</span>
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Bid History</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center space-x-2">
                  <img
                    src={farmerimage}
                    alt="Bidder"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-800">Bidder {index + 1}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{currentHighestBid - index * 100}/quintal</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
