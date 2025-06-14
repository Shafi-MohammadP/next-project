import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getToken } from "@/utils/auth";

function Index() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ address: "", phoneNumber: "" });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    } else {
      fetchUsers(token);
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/get-user-details/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load user data.");
    }
  };

  const handleAddDetails = async () => {
    const token = getToken();
    console.log(token," token");
    if (!token) {
      setError("You must be logged in to add user details.");
      return;
    }
    
    try {
      await axios.post(
        "http://localhost:5000/add-user-details",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(false);
      setFormData({ address: "", phoneNumber: "" });
      fetchUsers(token); // refresh list
    } catch (err) {
      console.error("Error saving details:", err);
      setError("Failed to save user details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          Add User Details
        </button>

        <ul className="space-y-3">
          <li
            key={user._id}
            className="p-4 border rounded-md hover:shadow-sm transition bg-gray-50"
          >
            <p className="font-medium text-gray-700">{user.name || "No Name"}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </li>
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Enter User Details</h3>
            <input
              type="text"
              placeholder="Address"
              className="w-full mb-3 px-4 py-2 border rounded"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full mb-3 px-4 py-2 border rounded"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleAddDetails}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
