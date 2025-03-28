import React, { useState, useEffect } from "react";
import styled from '@emotion/styled';

// Styled components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const Section = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #3498db;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
`;

const StatusMessage = styled.p`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  background: ${props => props.error ? '#fdecea' : '#e8f5e9'};
  color: ${props => props.error ? '#c62828' : '#2e7d32'};
  text-align: center;
`;

const DocumentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

const DocumentItem = styled.li`
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #f9f9f9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    transform: translateX(5px);
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
  }

  input {
    margin-right: 1rem;
    accent-color: #3498db;
  }
`;

const Button = styled.button`
  background: ${props => props.primary ? '#3498db' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;

  &:hover {
    background: ${props => props.primary ? '#2980b9' : '#e0e0e0'};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #3498db;
    color: white;
    font-weight: 600;
  }

  tr:nth-of-type(even) {
    background: #f9f9f9;
  }

  tr:hover {
    background: #f0f0f0;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => 
    props.status === 'completed' ? '#2ecc71' : 
    props.status === 'pending' ? '#f39c12' : 
    '#3498db'};
  color: white;
`;

const ScoreCell = styled.td`
  font-weight: 600;
  color: ${props => {
    if (props.score >= 80) return '#e74c3c';
    if (props.score >= 50) return '#f39c12';
    return '#2ecc71';
  }};
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-left: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const EmployeeDashboard = () => {
  const [backgroundChecks, setBackgroundChecks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [statusMessage, setStatusMessage] = useState({ text: "", error: false });
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  const fetchBackgroundChecks = async () => {
    try {
      const response = await fetch("/api/backgroundChecks", {
        method: "GET",
        headers: {
        //  Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch background checks");
      
  
      const data = await response.json();
      
      setBackgroundChecks(data);
    } catch (error) {
      console.error("Error fetching background checks:", error);
      setStatusMessage({ text: "Failed to fetch background checks", error: true });
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/documents/employee", {
        method: "GET",
        headers: {
         // Authorization: `Bearer ${token}`,
        },
      });
     
      if (!response.ok) throw new Error("Failed to fetch documents");

      const data = await response.json();
      console.log(data)
      
    } catch (error) { 
      console.error("Error fetching documents:", error);
      setStatusMessage({ text: "Failed to fetch documents", error: true });
    }
  };

  const submitBackgroundCheck = async () => {
    if (selectedDocuments.length === 0) {
      setStatusMessage({ text: "Please select documents for background check.", error: true });
      return;
    }

    setLoading(true);
    const requestPayload = {
      submittedDocuments: selectedDocuments,
    };

    try {
      const response = await fetch("/api/background-checks/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) throw new Error("Failed to submit background check");

      const result = await response.json();
      setStatusMessage({ text: "Background check submitted successfully!", error: false });
      setSelectedDocuments([]);
      fetchBackgroundChecks();
    } catch (error) {
      console.error("Error submitting background check:", error);
      setStatusMessage({ text: "Failed to submit background check", error: true });
    } finally {
      setLoading(false);
    }
  };

  const updateBackgroundCheckStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/backgroundChecks/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update background check status");

      await response.json();
      fetchBackgroundChecks();
      setStatusMessage({ text: "Status updated successfully!", error: false });
    } catch (error) {
      console.error("Error updating background check status:", error);
      setStatusMessage({ text: "Failed to update status", error: true });
    }
  };

  useEffect(() => {
    fetchBackgroundChecks();
    fetchDocuments();
  }, []);

  return (
    <DashboardContainer>
      <Title>Employee Background Check Dashboard</Title>

      {statusMessage.text && (
        <StatusMessage error={statusMessage.error}>
          {statusMessage.text}
        </StatusMessage>
      )}

      <Section>
        <SectionTitle>Submit New Background Check</SectionTitle>
        <DocumentsList>
          {documents.map((doc) => (
            <DocumentItem key={doc._id}>
              <label>
                <input
                  type="checkbox"
                  value={doc._id}
                  checked={selectedDocuments.includes(doc._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDocuments((prev) => [...prev, doc._id]);
                    } else {
                      setSelectedDocuments((prev) => prev.filter((id) => id !== doc._id));
                    }
                  }}
                />
                {doc.name} ({doc.type})
              </label>
            </DocumentItem>
          ))}
        </DocumentsList>
        <Button 
          primary 
          onClick={submitBackgroundCheck} 
          disabled={loading || selectedDocuments.length === 0}
        >
          Submit Background Check
          {loading && <LoadingSpinner />}
        </Button>
      </Section>

      <Section>
        <SectionTitle>Background Check History</SectionTitle>
        <Table>
          <thead>
            <tr>
              <th>Employer ID</th>
              <th>Status</th>
              <th>Risk Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {backgroundChecks.map((check) => (
              <tr key={check._id}>
                <td>{check.employerId}</td>
                <td>
                  <StatusBadge status={check.status}>
                    {check.status}
                  </StatusBadge>
                </td>
                <ScoreCell score={check.riskAssessmentScore}>
                  {check.riskAssessmentScore || 'N/A'}
                </ScoreCell>
                <td>
                  {check.status === "pending" && (
                    <Button onClick={() => updateBackgroundCheckStatus(check._id, "completed")}>
                      Complete Check
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </DashboardContainer>
  );
};

export default EmployeeDashboard;