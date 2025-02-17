import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'FARMER'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <UserPlus className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        <p className="text-gray-600">Join AgriShop today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Create a password"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            I am a
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'FARMER' })}
              className={`p-3 rounded-lg border ${
                formData.role === 'FARMER'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-gray-300 hover:border-green-600'
              }`}
            >
              Farmer
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'BUYER' })}
              className={`p-3 rounded-lg border ${
                formData.role === 'BUYER'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-gray-300 hover:border-green-600'
              }`}
            >
              Buyer
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-green-600 hover:text-green-700">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
