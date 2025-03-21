/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cropService, userService } from "../api";

const Dashboard = () => {
  const n = useNavigate(), [t, sT] = useState("active"), [u, sU] = useState(null),
    [l, sL] = useState(true), [c, sC] = useState([]), [r, sR] = useState(0);

  useEffect(() => {
    (async () => {
      sL(true);
      try {
        const { data: d } = await userService.getProfile();
        sU(d);
        const { data: crops } = await cropService.getMyListings();
        sC(crops);
        sR(crops.filter(e => e.status === "COMPLETED").reduce((a, e) => a + e.acceptedBid * e.quantity, 0));
      } catch { } finally { sL(false); }
    })();
  }, []);

  const hC = async i => {
    if (!window.confirm("Cancel this listing?")) return;
    try {
      await cropService.cancelCrop(i);
      sC(p => p.map(e => (e.id === i ? { ...e, status: "CANCELLED" } : e)));
    } catch { }
  };

  const fC = c.filter(e => e.status.toLowerCase() === t);
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {u && (
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
          {u.image ? <img src={u.image} alt="Profile" className="w-14 h-14 rounded-full object-cover" /> :
            <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-xl font-bold text-white">
              {u.name ? u.name[0].toUpperCase() : "U"}
            </div>}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{u.name}</h2>
            <p className="text-gray-500">{u.email}</p>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard t="Active Listings" v={c.filter(e => e.status === "ACTIVE").length} c="green" />
        <StatCard t="Completed Sales" v={c.filter(e => e.status === "COMPLETED").length} c="blue" />
        <StatCard t="Total Revenue" v={`₹${r.toLocaleString()}`} c="purple" />
      </div>
      <div className="border-b flex space-x-8">
        {["active", "cancelled", "completed"].map(tab => (
          <Tab key={tab} a={t} s={sT} tab={tab} />
        ))}
      </div>
      {l ? <p className="text-center text-gray-500">Loading...</p> : fC.length === 0 ?
        <p className="text-center text-gray-500">No {t} listings.</p> :
        <div className="grid md:grid-cols-2 gap-6">
          {fC.map(e => <Crop key={e.id} c={e} n={n} hC={hC} />)}
        </div>}
    </div>
  );
};

const StatCard = ({ t, v, c }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-gray-600">{t}</h3>
    <p className={`text-2xl font-bold text-${c}-800`}>{v}</p>
  </div>
);


const Tab = ({ a, s, tab }) => (
  <button onClick={() => s(tab)}
    className={`py-4 px-1 border-b-2 font-medium ${a === tab ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
    {tab[0].toUpperCase() + tab.slice(1)} Listings
  </button>
);

const Crop = ({ c, n, hC }) => (
  <>
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {c.imageBase64 ? <img src={c.imageBase64} alt={c.name} className="w-full h-40 object-cover" /> :
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">No Image</div>}
    <div className="p-6">
      <h3 className="text-xl font-semibold">{c.name}</h3>
      <p className="text-gray-500">{c.quantity} {c.unit}</p>
      <div className="flex justify-between text-sm"><span className="text-gray-600">Min Bid</span><span>₹{c.minBid}/{c.unit}</span></div>
      <div className="flex justify-between text-sm"><span className="text-gray-600">End Date</span><span className="text-orange-600">{new Date(c.endDate).toLocaleDateString()}</span></div>
      <div className="mt-4 flex space-x-2">
        <button onClick={() => n(`/crop/${c.id}`)} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">View</button>
        {c.status === "ACTIVE" && <button onClick={() => hC(c.id)} className="flex-1 border border-red-600 text-red-600 py-2 rounded hover:bg-red-50 transition">Cancel</button>}
      </div>
    </div>
  </div>
  </>
);

export default Dashboard;
*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cropService, userService, bidService } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState([]);
  const [bids, setBids] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: userData } = await userService.getProfile();
        setUser(userData);

        if (userData.role === 'FARMER') {
          const { data: cropsData } = await cropService.getMyListings();
          setCrops(cropsData);
          setRevenue(cropsData
            .filter(crop => crop.status === "COMPLETED")
            .reduce((acc, crop) => acc + (crop.acceptedBid * crop.quantity), 0)
          );
        } else {
          const { data: bidsData } = await bidService.getMyBids();
          setBids(bidsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelCrop = async (cropId) => {
    if (!window.confirm("Are you sure you want to cancel this listing?")) return;
    try {
      await cropService.cancelCrop(cropId);
      setCrops(prevCrops =>
        prevCrops.map(crop =>
          crop.id === cropId ? { ...crop, status: "CANCELLED" } : crop
        )
      );
    } catch (error) {
      console.error('Error cancelling crop:', error);
    }
  };

  const filteredCrops = crops.filter(crop => 
    crop.status.toLowerCase() === activeTab
  );

  const filteredBids = bids.filter(bid => {
    if (activeTab === "active") return bid.status === "PENDING";
    if (activeTab === "completed") return bid.status === "ACCEPTED";
    return bid.status === "REJECTED";
  });

  const renderFarmerStats = () => (
    <div className="grid md:grid-cols-3 gap-4">
      <StatCard 
        title="Active Listings" 
        value={crops.filter(crop => crop.status === "ACTIVE").length} 
        color="green" 
      />
      <StatCard 
        title="Completed Sales" 
        value={crops.filter(crop => crop.status === "COMPLETED").length} 
        color="blue" 
      />
      <StatCard 
        title="Total Revenue" 
        value={`₹${revenue.toLocaleString()}`} 
        color="purple" 
      />
    </div>
  );

  const renderBuyerStats = () => (
    <div className="grid md:grid-cols-3 gap-4">
      <StatCard 
        title="Active Bids" 
        value={bids.filter(bid => bid.status === "PENDING").length} 
        color="green" 
      />
      <StatCard 
        title="Won Bids" 
        value={bids.filter(bid => bid.status === "ACCEPTED").length} 
        color="blue" 
      />
      <StatCard 
        title="Total Spent" 
        value={`₹${bids
          .filter(bid => bid.status === "ACCEPTED")
          .reduce((acc, bid) => acc + bid.amount, 0)
          .toLocaleString()}`} 
        color="purple" 
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {user && (
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
          {user.image ? (
            <img 
              src={user.image} 
              alt="Profile" 
              className="w-14 h-14 rounded-full object-cover" 
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-xl font-bold text-white">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-green-600">{user.role}</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>

      {user?.role === 'FARMER' ? renderFarmerStats() : renderBuyerStats()}

      <div className="border-b flex space-x-8">
        {user?.role === 'FARMER' ? (
          ["active", "completed", "cancelled"].map(tab => (
            <Tab 
              key={tab} 
              active={activeTab} 
              setActive={setActiveTab} 
              tab={tab} 
            />
          ))
        ) : (
          ["active", "completed", "rejected"].map(tab => (
            <Tab 
              key={tab} 
              active={activeTab} 
              setActive={setActiveTab} 
              tab={tab} 
              label={tab === "active" ? "Active Bids" : tab === "completed" ? "Won Bids" : "Lost Bids"}
            />
          ))
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : user?.role === 'FARMER' ? (
        filteredCrops.length === 0 ? (
          <p className="text-center text-gray-500">No {activeTab} listings found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCrops.map(crop => (
              <CropCard 
                key={crop.id} 
                crop={crop} 
                navigate={navigate} 
                handleCancel={handleCancelCrop} 
              />
            ))}
          </div>
        )
      ) : (
        filteredBids.length === 0 ? (
          <p className="text-center text-gray-500">No {activeTab} bids found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredBids.map(bid => (
              <BidCard 
                key={bid.id} 
                bid={bid} 
                navigate={navigate} 
              />
            ))}
          </div>
        )
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

const Tab = ({ active, setActive, tab, label }) => (
  <button
    onClick={() => setActive(tab)}
    className={`py-4 px-1 border-b-2 font-medium ${
      active === tab
        ? "border-green-600 text-green-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {label || `${tab.charAt(0).toUpperCase()}${tab.slice(1)} Listings`}
  </button>
);

const CropCard = ({ crop, navigate, handleCancel }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {crop.imageBase64 ? (
      <img 
        src={crop.imageBase64} 
        alt={crop.name} 
        className="w-full h-40 object-cover" 
      />
    ) : (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
        No Image
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-semibold">{crop.name}</h3>
      <p className="text-gray-500">{crop.quantity} {crop.unit}</p>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Min Bid</span>
        <span>₹{crop.minBid}/{crop.unit}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">End Date</span>
        <span className="text-orange-600">
          {new Date(crop.endDate).toLocaleDateString()}
        </span>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => navigate(`/crop/${crop.id}`)}
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          View
        </button>
        {crop.status === "ACTIVE" && (
          <button
            onClick={() => handleCancel(crop.id)}
            className="flex-1 border border-red-600 text-red-600 py-2 rounded hover:bg-red-50 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  </div>
);

const BidCard = ({ bid, navigate }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{bid.cropName}</h3>
          <p className="text-gray-500">Bid Amount: ₹{bid.amount}</p>
        </div>
        <span className={`px-2 py-1 rounded text-sm ${
          bid.status === "PENDING"
            ? "bg-yellow-100 text-yellow-800"
            : bid.status === "ACCEPTED"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}>
          {bid.status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Bid Date</span>
          <span>{new Date(bid.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => navigate(`/crop/${bid.cropId}`)}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          View Crop Details
        </button>
      </div>
    </div>
  </div>
);

export default Dashboard;