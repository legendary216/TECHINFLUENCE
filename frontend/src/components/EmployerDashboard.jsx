import React from "react";
import { useParams } from "react-router-dom";

const EmployerDashboard = () => {
  const { id } = useParams(); // Get employer ID from URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Employer Dashboard</h1>
      <p className="mt-4">Welcome, Employer! Your ID: {id}</p>
    </div>
  );
};

export default EmployerDashboard;
