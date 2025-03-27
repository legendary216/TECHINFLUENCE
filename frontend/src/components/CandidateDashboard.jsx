import React from "react";
import { useParams } from "react-router-dom";

const CandidateDashboard = () => {
  const { id } = useParams(); // Get candidate ID from URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
      <p className="mt-4">Welcome, Candidate! Your ID: {id}</p>
    </div>
  );
};

export default CandidateDashboard;
