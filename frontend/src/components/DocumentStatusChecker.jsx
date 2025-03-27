import { useState } from 'react';

const DocumentStatusChecker = ({ documentIds }) => {
  const [documentData, setDocumentData] = useState([]); // Store an array of document statuses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkDocumentStatuses = async () => {
    if (!documentIds || documentIds.length === 0) {
      setError('No document IDs provided');
      return;
    }

    setLoading(true);
    setError(null);
    setDocumentData([]); // Reset previous results

    try {
      // Iterate over each documentId and fetch its status
      const results = await Promise.all(
        documentIds.map(async (docId) => {
          const response = await fetch(`http://localhost:5000/api/documents/${docId}/status`);

          if (!response.ok) {
            return { id: docId, error: 'Failed to fetch document status' };
          }

          const data = await response.json();
          return { id: docId, status: data.status };
        })
      );

      // Update state with fetched document statuses
      setDocumentData(results);
    } catch (err) {
      setError('Failed to check document statuses');
      setDocumentData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="document-status-checker p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium">Document Status</h2>
        <button
          onClick={checkDocumentStatuses}
          disabled={loading || !documentIds || documentIds.length === 0}
          className={`px-3 py-1 text-sm rounded ${loading || !documentIds || documentIds.length === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </div>

      {documentIds && documentIds.length > 0 && (
        <p className="text-sm text-gray-600 mb-3">
          Document IDs: <code className="bg-gray-100 px-1.5 py-0.5 rounded">{documentIds.join(', ')}</code>
        </p>
      )}

      {error && (
        <div className="p-2 mb-3 text-sm text-red-600 bg-red-50 rounded">
          Error: {error}
        </div>
      )}

      {documentData.length > 0 && (
        <div className="mt-3 p-3 border-t">
          {documentData.map((doc) => (
            <div key={doc.id} className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div className="text-gray-500">Document ID:</div>
              <div>{doc.id}</div>

              {doc.error ? (
                <>
                  <div className="text-gray-500">Status:</div>
                  <div className="text-red-500">{doc.error}</div>
                </>
              ) : (
                <>
                  <div className="text-gray-500">Status:</div>
                  <div className={`font-medium inline-flex items-center px-2 py-0.5 rounded text-xs ${
                    doc.status === 'validated' ? 'bg-green-100 text-green-800' :
                    doc.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status || 'pending'}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {documentIds && documentIds.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          No document IDs provided - please pass document IDs to check their status.
        </p>
      )}
    </div>
  );
};

export default DocumentStatusChecker;
