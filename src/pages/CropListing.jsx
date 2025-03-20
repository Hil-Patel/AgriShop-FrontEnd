import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { cropService } from "../api"; // Import API service
import cropPlaceholder from "../images/crop.jpeg"; // Default image for crops

const CropListing = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch crops from API
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await cropService.getAllCrops();
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };
    fetchCrops();
  }, []);

  // Filter crops based on search term
  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Available Crops</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Crop Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={crop.imageBase64 || cropPlaceholder} // Use imageBase64 directly
                alt={crop.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{crop.name}</h3>
                    <p className="text-sm text-gray-500">
                      Listed by: {crop.sellerName || "Unknown"}
                    </p>
                  </div>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      crop.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {crop.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-medium">
                      {crop.quantity} {crop.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Bid</span>
                    <span className="font-medium text-green-600">
                      ₹{crop.minBid}/{crop.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date</span>
                    <span className="font-medium text-orange-600">
                      {new Date(crop.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/crop/${crop.id}`}
                  className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No crops found.</p>
        )}
      </div>
    </div>
  );
};

export default CropListing;
