import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import cropimage from '../images/crop.jpeg'
import farmerimage from '../images/farmer.jpeg'
const CropListing = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Available Crops</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search crops..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={cropimage}
              alt="Crop"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Premium Rice</h3>
                  <p className="text-sm text-gray-500">Listed by: Dhyey Patel</p>
                </div>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                  Active
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium">100 quintals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Bid</span>
                  <span className="font-medium text-green-600">₹3,200/quintal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Left</span>
                  <span className="font-medium text-orange-600">2 days</span>
                </div>
              </div>

              <Link
                to={`/crop/${index + 1}`}
                className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropListing;