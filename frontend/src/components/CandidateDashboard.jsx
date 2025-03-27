import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CandidateDashboard = () => {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  
  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // Remove a file from the list
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Submit files to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setMessage("❌ Please select at least one document.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("candidateId", id);  // Replace with dynamic candidate ID

    files.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/documents/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("✅ Documents submitted successfully!");
        setFiles([]); // Clear selected files after success
      } else {
        setMessage(`❌ ${result.error || "Failed to submit documents."}`);
      }
    } catch (error) {
      setMessage("❌ Error submitting documents.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center">Candidate Dashboard</h1>
        <p className="text-gray-300 text-center mt-2">Upload your documents for verification.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 block text-center"
          >
            Select Files
          </label>

          {/* Display selected files */}
          {files.length > 0 && (
            <div className="mt-4 text-gray-300 text-sm">
              <p>Selected Files:</p>
              <ul className="list-disc pl-4">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {file.name}
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700"
          >
            {loading ? "Submitting..." : "Submit Documents"}
          </button>
        </form>

        {message && <p className="text-center text-gray-300 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default CandidateDashboard;
