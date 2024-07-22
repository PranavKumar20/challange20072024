import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    voice: '',
    language: '',
    script: '',
    purpose: '',
    knowledgeBase: '',
    calendar: '',
    firstLine: '',
    tone: '',
    postCallAnalysis: false,
    postCallAnalysisSchema: {}
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const headers = {
          'accept': 'application/json',
          'Authorization': 'Bearer tg_540894db-826d-4213-b381-7b12d764ff73-riGyz9xq2LDAVXz_D3KflA'
        };
        const response = await axios.get('https://www.toingg.com/api/v3/get_campaigns', { headers });
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      ...campaign.campaignModelData
    });
    setPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = () => {
    const payload = {
      campaignModelData: formData,
      campId: selectedCampaign.campId
    };

    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer tg_540894db-826d-4213-b381-7b12d764ff73-riGyz9xq2LDAVXz_D3KflA',
      'Content-Type': 'application/json'
    };

    axios.post('https://www.toingg.com/api/v3/update_campaign', payload, { headers })
      .then(response => console.log('Campaign updated:', response.data))
      .catch(error => console.error('Error updating campaign:', error));
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
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Voice</label>
                <input type="text" name="voice" value={formData.voice} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Language</label>
                <select name="language" value={formData.language} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Purpose</label>
                <input type="text" name="purpose" value={formData.purpose} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium mb-2">Script</label>
                <textarea name="script" value={formData.script} onChange={handleInputChange} className="w-full p-3 h-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Knowledge Base</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-200">Upload Document</button>
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
              <input type="text" name="calendar" value={formData.calendar} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">First Line</label>
              <input type="text" name="firstLine" value={formData.firstLine} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tone</label>
              <input type="text" name="tone" value={formData.tone} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
      {!selectedCampaign ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select Campaign to Update</h2>
          <ul className="space-y-2">
            {campaigns.map((campaign) => (
              <li key={campaign.campId} className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => handleCampaignSelect(campaign)}>
                {campaign.campaignModelData.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div style={{ width: `${(page / 3) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
            </div>
          </div>
          <div>
            {renderPageContent()}
          </div>
          <div className="flex justify-end mt-4">
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
        </>
      )}
    </div>
  );
};

export default UpdateCampaign;
