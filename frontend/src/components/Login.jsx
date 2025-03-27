import React from "react";
import { Link } from "react-router-dom";
import { Router } from "react-router-dom";
import Register from "./Register";



const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Access your AI verification portal
        </h2>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <input
            type="text"
            placeholder="Enter username"
            className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
            Login
          </button>
          <p className="text-gray-400 mt-3 text-sm cursor-pointer hover:underline">
            Forgot password?
          </p>
          <p className="text-gray-400 mt-3 text-sm">OR</p>
          <p className="text-gray-400 mt-3 text-sm">
            If not registered, click
            <Link
              to="/register"
              className="text-blue-400 hover:underline ml-1"
            >
              here to register
            </Link>
              
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;