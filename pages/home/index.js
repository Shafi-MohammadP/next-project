import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken, logout } from "@/utils/auth";
// import {jwt_decode} from "jwt-decode";
import { jwtDecode } from "jwt-decode";
export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name, email: decoded.email });
      } catch (err) {
        console.error("Token decode error:", err);
        logout();
        router.push("/login");
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Home Page 🎉</h1>
        {user && (
          <div className="text-gray-700 mb-6">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
