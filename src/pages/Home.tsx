import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout as Plant, Users, Clock, Award } from 'lucide-react';
import cropimage from '../images/crop.jpeg'
import farmerimage from '../images/farmer.jpeg'
const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-16">
        <h1 className="text-5xl font-bold text-gray-800">
          Connect Farmers with Buyers
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A transparent marketplace where farmers can sell their crops through a fair bidding system
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/crops"
            className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
          >
            Browse Crops
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center space-y-4 p-6 rounded-xl bg-white shadow-md">
          <Plant className="w-12 h-12 text-green-600 mx-auto" />
          <h3 className="text-xl font-semibold">List Your Crops</h3>
          <p className="text-gray-600">
            Farmers can easily list their crops with detailed information and set bidding timelines
          </p>
        </div>

        <div className="text-center space-y-4 p-6 rounded-xl bg-white shadow-md">
          <Clock className="w-12 h-12 text-green-600 mx-auto" />
          <h3 className="text-xl font-semibold">Real-time Bidding</h3>
          <p className="text-gray-600">
            Buyers can place bids and track the highest current bid in real-time
          </p>
        </div>

        <div className="text-center space-y-4 p-6 rounded-xl bg-white shadow-md">
          <Award className="w-12 h-12 text-green-600 mx-auto" />
          <h3 className="text-xl font-semibold">Fair Selection</h3>
          <p className="text-gray-600">
            Farmers can choose the best offer based on price and buyer reputation
          </p>
        </div>
      </section>

      {/* Featured Crops Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Featured Crops</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Sample crops - will be replaced with real data */}
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
              src={cropimage}
alt="Crop"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">Organic Wheat</h3>
                <p className="text-gray-600">Current Bid: ₹2,500/quintal</p>
                <p className="text-sm text-gray-500">Ends in 2 days</p>
                <Link
                  to="/crop/1"
                  className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Place Bid
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;