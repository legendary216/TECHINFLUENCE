import { useState } from 'react';
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiClock, FiInfo } from 'react-icons/fi';

const DocumentStatusChecker = ({ documentIds }) => {
  const [documentData, setDocumentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkDocumentStatuses = async () => {
    if (!documentIds || documentIds.length === 0) {
      setError('No document IDs provided');
      return;
    }

    setLoading(true);
    setError(null);
    setDocumentData([]);

    try {
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

      setDocumentData(results);

      setTimeout(() => {
        window.location.reload();
      }, 5000);

    } catch (err) {
      setError('Failed to check document statuses. Please try again.');
      setDocumentData([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'validated':
        return <FiCheckCircle className="text-green-400 mr-1.5" />;
      case 'failed':
        return <FiXCircle className="text-red-400 mr-1.5" />;
      default:
        return <FiClock className="text-yellow-400 mr-1.5" />;
    }
  };

  return (
    <div className="document-status-checker p-6 border border-gray-700 rounded-xl bg-gray-800 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className='p-[12px]'>
          <h2 className="text-xl font-semibold text-gray-100">Document Status Tracker</h2>
          <p className="text-sm text-gray-400">Check the validation status</p>
        </div>
        <button
          onClick={checkDocumentStatuses}
          disabled={loading || !documentIds || documentIds.length === 0}
          className={`px-4 py-2 rounded-md flex items-center transition-all ${
            loading || !documentIds || documentIds.length === 0
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm'
          }`}
        >
          {loading ? (
            <>
              <FiRefreshCw className="animate-spin mr-2" />
              Checking...
            </>
          ) : (
            <>
              <FiRefreshCw className="mr-2" />
              Check Status
            </>
          )}
        </button>
      </div>

      {documentIds && documentIds.length > 0 && (
        <div className="mb-4 p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center text-sm text-gray-300">
            <FiInfo className="mr-2 text-blue-400" />
            <span>Tracking {documentIds.length} document{documentIds.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 text-sm text-red-400 bg-red-900/30 rounded-lg border border-red-800 flex items-start">
          <FiXCircle className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {documentData.length > 0 ? (
        <div className="space-y-3">
          {documentData.map((doc) => (
            <div 
              key={doc.id} 
              className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-100">Document ID: {doc.id}</h3>
                  <div className="mt-2 flex items-center">
                    {doc.error ? (
                      <span className="text-red-400 flex items-center">
                        <FiXCircle className="mr-1.5" />
                        {doc.error}
                      </span>
                    ) : (
                      <>
                        {getStatusIcon(doc.status)}
                        <span className={`font-medium ${
                          doc.status === 'validated' ? 'text-green-400' :
                          doc.status === 'failed' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {doc.status || 'pending'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  doc.error ? 'bg-red-900/50 text-red-300' :
                  doc.status === 'validated' ? 'bg-green-900/50 text-green-300' :
                  doc.status === 'failed' ? 'bg-red-900/50 text-red-300' :
                  'bg-yellow-900/50 text-yellow-300'
                }`}>
                  {doc.error ? 'Error' : doc.status || 'Pending'}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 text-xs text-gray-400 italic">
            Page will automatically refresh in 5 seconds to update statuses...
          </div>
        </div>
      ) : (
        <div className="p-6 text-center border-2 border-dashed border-gray-700 rounded-lg">
          {documentIds && documentIds.length === 0 ? (
            <div className="text-gray-400">
              <FiInfo className="mx-auto text-2xl mb-2" />
              <p>No document IDs provided</p>
              <p className="text-sm">Please pass document IDs to check their status</p>
            </div>
          ) : (
            <div className="text-gray-400">
              <FiRefreshCw className="mx-auto text-2xl mb-2" />
              <p>Ready to check document statuses</p>
              <p className="text-sm">Click the "Check Status" button to begin</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentStatusChecker;