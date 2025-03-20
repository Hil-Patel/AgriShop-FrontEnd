import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { cropService } from "../api"; // Import cropService

const CreateCrop = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    unit: "quintal",
    minBid: "",
    endDate: "",
    images: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("unit", formData.unit);
    formDataToSend.append("minBid", formData.minBid);
    formDataToSend.append("endDate", formData.endDate);

    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        formDataToSend.append("images", formData.images[i]);
      }
    }

    try {
      await cropService.createCrop(formDataToSend); // ✅ Using `cropService`
      alert("Crop listed successfully!");
      setFormData({
        name: "",
        description: "",
        quantity: "",
        unit: "quintal",
        minBid: "",
        endDate: "",
        images: null,
      });
    } catch (error) {
      console.error("Error listing crop:", error);
      alert(error.response?.data?.message || "Failed to list crop.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">List Your Crop</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Crop Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="e.g., Organic Wheat"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 h-32"
            placeholder="Provide details about your crop..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) =>
                setFormData({ ...formData, unit: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="quintal">Quintal</option>
              <option value="kg">Kilogram</option>
              <option value="ton">Ton</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Minimum Bid (per {formData.unit})
          </label>
          <input
            type="number"
            value={formData.minBid}
            onChange={(e) =>
              setFormData({ ...formData, minBid: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter minimum bid amount"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Bidding End Date
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Crop Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setFormData({ ...formData, images: e.target.files })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          List Crop for Bidding
        </button>
      </form>
    </div>
  );
};

export default CreateCrop;
