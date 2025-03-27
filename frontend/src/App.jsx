import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee_Login" element={<Login />} />
        <Route path="/employer_Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login */}
      <div className="w-1/3 flex items-center justify-center bg-gray-900 p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-20" />
        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700/50 transform transition-all hover:scale-[1.005]">
            <Login />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent relative">
      
      </div>

      {/* Right Side - Content */}
      <div className="w-2/3 flex flex-col justify-center items-center p-10 bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse-slow" />
        <div className="relative z-10 space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300 animate-text-glow">
              Welcome to AI-powered
            </h1>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-400 animate-text-glow">
              Background Verification
            </h1>
          </div>
          
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mx-auto">
            Streamline your hiring process with our advanced AI-powered solution.
            Whether you're an employer seeking efficient background checks or a
            candidate ensuring seamless verification, our system offers accuracy,
            speed, and transparency at every step.
          </p>

          <div className="mt-8">
            <p className="text-xl font-semibold text-gray-200 animate-pulse-slow">
              Get started by selecting your role below
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Employer
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;