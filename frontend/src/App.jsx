import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import CandidateDashboard from "./components/CandidateDashboard.jsx"
import EmployerDashboard from "./components/EmployerDashboard.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee_Login" element={<Login />} />
        <Route path="/employer_Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/candidate_dashboard/:id" element={<CandidateDashboard />} /> 
        <Route path="/employer_dashboard/:id" element={<EmployerDashboard />} /> 
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login (Smaller width) */}
      <div className="w-1/3 flex items-center justify-center bg-gray-900 p-10">
        <div className="w-full max-w-md">
          <Login />
        </div>
      </div>

      {/* Left Divider (Just next to Login) */}
      <div className="w-1 bg-gray-700"></div>

      {/* Right Side - Homepage Content (Bigger width) */}
      <div className="w-2/3 flex flex-col justify-center items-center p-10 bg-gray-800 text-white">
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
