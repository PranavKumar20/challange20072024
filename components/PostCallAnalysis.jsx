import React, { useState } from 'react';
import axios from 'axios';

const PostCallAnalysis = () => {
  const [callId, setCallId] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer tg_540894db-826d-4213-b381-7b12d764ff73-riGyz9xq2LDAVXz_D3KflA'
    };

    try {
      const response = await axios.get('https://www.toingg.com/api/v3/get_post_call_analysis', {
        headers,
        params: { callId }
      });
      setAnalysis(response.data);
    } catch (error) {
      setError('Error fetching post-call analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Get Post-Call Analysis</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Call ID</label>
        <input 
          type="text" 
          value={callId} 
          onChange={(e) => setCallId(e.target.value)} 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" 
        />
      </div>
      <div className="flex justify-end mt-4">
        <button 
          onClick={handleFetchAnalysis} 
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          Get Analysis
        </button>
      </div>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {analysis && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Post-Call Analysis</h3>
          <pre className="p-4 bg-gray-100 rounded-lg">{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PostCallAnalysis;
