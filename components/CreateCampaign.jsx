import React, { useState } from 'react';
import axios from 'axios';

const CreateCampaign = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    voice: '',
    language: 'english',
    script: '',
    purpose: '',
    knowledgeBase: '',
    calendar: '',
    firstLine: '',
    tone: '',
    postCallAnalysis: false,
    postCallAnalysisSchema: {},
    files: []
  });
  const [campaignCreated, setCampaignCreated] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: e.target.files
    });
  };

  const handleSubmit = () => {
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer tg_540894db-826d-4213-b381-7b12d764ff73-riGyz9xq2LDAVXz_D3KflA',
      'Content-Type': 'application/json'
    };

    const data = new FormData();
    for (const key in formData) {
      if (key === 'files') {
        for (let i = 0; i < formData.files.length; i++) {
          data.append('files', formData.files[i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    axios.post('https://www.toingg.com/api/v3/create_campaign/', data, { headers })
      .then(response => {
        console.log(response.data);
        setCampaignCreated(true);
        setError(null);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to create campaign');
        setCampaignCreated(false);
      });
  };

  const renderPageContent = () => {
    switch (page) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Basic Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Voice</label>
                <input type="text" name="voice" value={formData.voice} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Language</label>
                <select name="language" value={formData.language} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent">
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Purpose</label>
                <input type="text" name="purpose" value={formData.purpose} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium mb-2">Script</label>
                <textarea name="script" value={formData.script} onChange={handleInputChange} className="w-full p-3 h-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"></textarea>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Knowledge Base</h2>
            <input type="file" multiple onChange={handleFileChange} className="mb-4" />
            <div className="border-dashed border-2 border-gray-300 p-4 text-center">
              Drop your files here
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Extra Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Time Range</label>
              <input type="text" name="calendar" value={formData.calendar} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">First Line</label>
              <input type="text" name="firstLine" value={formData.firstLine} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tone</label>
              <input type="text" name="tone" value={formData.tone} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Need Post Call Analysis</label>
              <input type="checkbox" name="postCallAnalysis" checked={formData.postCallAnalysis} onChange={handleInputChange} className="mr-2" />
              Yes
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div style={{ width: `${(page / 3) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
        </div>
      </div>
      <div className="overflow-auto" style={{ height: 'calc(100vh - 160px)' }}>
        {campaignCreated ? (
          <div className="text-center text-2xl font-bold text-green-600">Campaign Created Successfully!</div>
        ) : (
          renderPageContent()
        )}
        {error && <div className="text-center text-2xl font-bold text-red-600">{error}</div>}
      </div>
      {!campaignCreated && (
        <div className="flex justify-end mt-8">
          {page < 3 ? (
            <button onClick={() => setPage(page + 1)} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200">
              Continue
            </button>
          ) : (
            <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200">
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
