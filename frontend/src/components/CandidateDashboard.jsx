import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DocumentStatusChecker from "./DocumentStatusChecker";
import { FiUpload, FiX, FiUser, FiFile, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

const CandidateDashboard = () => {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState([]);
  const [currentDocId, setCurrentDocId] = useState([]);

  const fetchCandidateDocuments = async () => {
    if (!id) {
      setError("No candidate ID provided");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/documents/candidate/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No documents found for this candidate");
        }
        throw new Error("Failed to fetch documents");
      }

      const data = await response.json();
      setCurrentDocId(data);
      setDocuments(data);
    } catch (err) {
      setError(err.message);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidateDocuments();
  }, [id]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setMessage("");
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setMessage("Please select at least one document");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("candidateId", id);

    files.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/documents/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      const documentIds = result.documents.map(doc => doc._id);
      
      if (response.ok) {
        setMessage("Documents submitted successfully!");
        setFiles([]);
        await validateDocuments(documentIds);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setMessage(result.error || "Failed to submit documents");
      }
    } catch (error) {
      setMessage("Error submitting documents");
    }

    setLoading(false);
  };

  const validateDocuments = async (documentIds) => {
    try {
      for (const documentId of documentIds) {
        await fetch(`http://localhost:5000/api/documents/${documentId}/validate`, {
          method: "PUT",
        });
      }
      fetchCandidateDocuments();
    } catch (error) {
      console.error("Error validating documents:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-900 rounded-full text-blue-400">
              <FiUser className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Candidate Dashboard</h1>
              <p className="text-gray-400">Upload and track your verification documents</p>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Status Checker */}
          <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Document Status</h2>
              <button
                onClick={fetchCandidateDocuments}
                className="flex items-center text-sm text-blue-400 hover:text-blue-300"
              >
                <FiRefreshCw className="mr-1" /> Refresh
              </button>
            </div>
            
            {loading && currentDocId.length === 0 ? (
              <div className="flex justify-center p-8">
                <FiRefreshCw className="animate-spin text-gray-500 text-2xl" />
              </div>
            ) : (
              <DocumentStatusChecker documentIds={currentDocId} />
            )}
          </div>

          {/* Right Side - Upload Form */}
          <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Upload Documents</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-8 hover:border-blue-500 transition-colors">
                <FiUpload className="text-3xl text-gray-500 mb-2" />
                <p className="text-gray-400 mb-3 text-center">
                  Drag & drop files here or click to browse
                </p>
                <label className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors">
                  <span>Select Files</span>
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">PDF files only</p>
              </div>

              {/* Selected files preview */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">Selected files:</h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-md">
                        <div className="flex items-center space-x-2">
                          <FiFile className="text-gray-400" />
                          <span className="text-sm text-gray-200 truncate max-w-xs">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <FiX />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || files.length === 0}
                  className={`w-full py-3 px-4 rounded-md flex items-center justify-center ${
                    loading || files.length === 0
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-500'
                  } transition-colors`}
                >
                  {loading ? (
                    <>
                      <FiRefreshCw className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Documents"
                  )}
                </button>
              </div>
            </form>

            {/* Messages */}
            {(message || error) && (
              <div className={`mt-4 p-3 rounded-md text-sm flex items-start ${
                error ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'
              }`}>
                {error ? (
                  <FiX className="mr-2 mt-0.5 flex-shrink-0" />
                ) : (
                  <FiCheckCircle className="mr-2 mt-0.5 flex-shrink-0" />
                )}
                <span>{error || message}</span>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-6 p-3 bg-blue-900/20 rounded-md text-sm text-blue-300 border border-blue-800/50">
              <h3 className="font-medium mb-1 text-blue-200">Document Submission Guidelines</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Only PDF files are accepted</li>
                <li>Maximum file size: 5MB per document</li>
                <li>Documents are verified automatically</li>
                <li>Check status updates on the left panel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;