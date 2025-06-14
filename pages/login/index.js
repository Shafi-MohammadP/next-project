import { baseUrl } from '@/components/constants/constants';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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

  const handleLogin = async () => {
    const {email, password} = formData;
    if (!email || !password) {
    setMessage("Both email and password are required.");
    return;
  }
    try {
      const res = await axios.post(`${baseUrl}/login`, formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/home"), 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

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
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
        >
          Login
        </button>

        {message && <p className="text-sm text-center text-gray-700">{message}</p>}

        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">Signup</a>
        </p>
      </div>
    </div>
  );
}
