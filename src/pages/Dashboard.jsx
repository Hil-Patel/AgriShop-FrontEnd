import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          List New Crop
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600">Active Listings</h3>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600">Total Bids</h3>
          <p className="text-2xl font-bold">23</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600">Completed Sales</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600">Total Revenue</h3>
          <p className="text-2xl font-bold">₹1,25,000</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-1 border-b-2 font-medium ${
              activeTab === 'active'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Listings
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-4 px-1 border-b-2 font-medium ${
              activeTab === 'pending'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Bids
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-1 border-b-2 font-medium ${
              activeTab === 'completed'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Completed
          </button>
        </nav>
      </div>

      {/* Listings Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Organic Wheat</h3>
                  <p className="text-gray-500">100 quintals</p>
                </div>
                {activeTab === 'active' && (
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    15 bids
                  </span>
                )}
                {activeTab === 'pending' && (
                  <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded">
                    Pending approval
                  </span>
                )}
                {activeTab === 'completed' && (
                  <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                    Sold
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Minimum Bid</span>
                  <span>₹2,500/quintal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Highest Bid</span>
                  <span className="font-semibold text-green-600">₹3,200/quintal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time Left</span>
                  <span className="text-orange-600">2 days</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                  View Details
                </button>
                {activeTab === 'active' && (
                  <button className="flex-1 border border-red-600 text-red-600 py-2 rounded hover:bg-red-50 transition-colors">
                    End Early
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;