import { baseUrl } from '@/components/constants/constants';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${baseUrl}/create-user`, formData);
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
        >
          Signup
        </button>

        {message && <p className="text-sm text-center text-gray-700">{message}</p>}

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
