import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cropService, userService } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userProfile = await userService.getProfile();
        setUser(userProfile.data);

        const allCrops = await cropService.getMyListings();
        setCrops(allCrops.data);

        const completedCrops = allCrops.data.filter(crop => crop.status === "COMPLETED");
        const revenue = completedCrops.reduce((sum, crop) => sum + (crop.acceptedBid * crop.quantity), 0);
        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancel = async (cropId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this listing?");
    if (!confirmCancel) return;

    try {
      await cropService.cancelCrop(cropId);
      setCrops((prevCrops) =>
        prevCrops.map((crop) =>
          crop.id === cropId ? { ...crop, status: "CANCELLED" } : crop
        )
      );
    } catch (error) {
      console.error("Failed to cancel crop:", error);
    }
  };

  const filteredCrops = crops.filter((crop) => {
    if (activeTab === "active") return crop.status === "ACTIVE";
    if (activeTab === "cancelled") return crop.status === "CANCELLED";
    if (activeTab === "completed") return crop.status === "COMPLETED";
    return false;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {user && (
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
          {user.image ? (
            <img src={user.image} alt="Profile" className="w-14 h-14 rounded-full object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-xl font-bold text-white">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Active Listings" value={crops.filter(c => c.status === "ACTIVE").length} color="green" />
        <StatCard title="Completed Sales" value={crops.filter(c => c.status === "COMPLETED").length} color="blue" />
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} color="purple" />
      </div>

      <div className="border-b">
        <nav className="flex space-x-8">
          <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="active" label="Active Listings" />
          <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="cancelled" label="Cancelled Listings" />
          <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="completed" label="Completed Sales" />
        </nav>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filteredCrops.length === 0 ? (
        <p className="text-center text-gray-500">No {activeTab} listings available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCrops.map((crop) => (
            <CropCard key={crop.id} crop={crop} navigate={navigate} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-gray-600">{title}</h3>
    <p className={`text-2xl font-bold text-${color}-800`}>{value}</p>
  </div>
);

const TabButton = ({ activeTab, setActiveTab, tab, label }) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={`py-4 px-1 border-b-2 font-medium ${
      activeTab === tab ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {label}
  </button>
);

const CropCard = ({ crop, navigate, onCancel }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {crop.imageBase64 ? (
      <img src={crop.imageBase64} alt={crop.name} className="w-full h-40 object-cover" />
    ) : (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
        No Image Available
      </div>
    )}

    <div className="p-6">
      <h3 className="text-xl font-semibold">{crop.name}</h3>
      <p className="text-gray-500">{crop.quantity} {crop.unit}</p>

      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Minimum Bid</span>
        <span>₹{crop.minBid}/{crop.unit}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">End Date</span>
        <span className="text-orange-600">{new Date(crop.endDate).toLocaleDateString()}</span>
      </div>

      <div className="mt-4 flex space-x-2">
        <button 
          onClick={() => navigate(`/crop/${crop.id}`)}
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          View Details
        </button>
        {crop.status === "ACTIVE" && (
          <button 
            onClick={() => onCancel(crop.id)}
            className="flex-1 border border-red-600 text-red-600 py-2 rounded hover:bg-red-50 transition"
          >
            Cancel Listing
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Dashboard;
