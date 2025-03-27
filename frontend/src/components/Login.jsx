import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg || "Login failed");
      }

      // Save JWT token
      localStorage.setItem("token", result.token);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Access your AI verification portal
        </h2>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-700 text-white focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-700 text-white focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-gray-400 mt-3 text-sm cursor-pointer hover:underline">
            Forgot password?
          </p>
          <p className="text-gray-400 mt-3 text-sm">OR</p>
          <p className="text-gray-400 mt-3 text-sm">
            If not registered, click{" "}
            <Link to="/register" className="text-blue-400 hover:underline ml-1">
              here to register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
