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
      <div className="w-1/2 flex items-center justify-center bg-gray-900 p-10">
        <div className="w-full max-w-md">
          <Login />
        </div>
      </div>

      {/* Divider */}
      <div className="w-1 bg-gray-700"></div>

      {/* Right Side - Homepage Content */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-gray-800 text-white">
        <h1 className="text-4xl font-extrabold text-center">
          Welcome to AI-powered
        </h1>
        <h1 className="text-4xl font-extrabold text-center mb-6">
          Background Verification System
        </h1>
        <p className="text-center max-w-lg">
          Streamline your hiring process with our advanced AI-powered solution.
          Whether you're an employer seeking efficient background checks or a
          candidate ensuring seamless verification, our system offers accuracy,
          speed, and transparency at every step.
        </p>
        <p className="mt-8 text-lg font-bold">
          Get started by selecting your role below
        </p>
      </div>
    </div>
  );
}

export default App;
