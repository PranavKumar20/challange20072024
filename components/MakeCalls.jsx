import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const MakeCalls = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [manualNumber, setManualNumber] = useState('');
  const [campaignID, setCampaignID] = useState('');

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        const numbers = results.data.map(row => row.phoneNumber);
        setPhoneNumbers(numbers);
      }
    });
  };

  const handleManualAdd = () => {
    if (manualNumber) {
      setPhoneNumbers([...phoneNumbers, manualNumber]);
      setManualNumber('');
    }
  };

  const handleMakeCalls = async () => {
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer tg_540894db-826d-4213-b381-7b12d764ff73-riGyz9xq2LDAVXz_D3KflA',
      'Content-Type': 'application/json'
    };

    for (const number of phoneNumbers) {
      const payload = {
        name: 'Call Name', // Adjust according to your needs
        phoneNumber: number,
        campID: campaignID
      };

      try {
        const response = await axios.post('https://www.toingg.com/api/v3/make_call', payload, { headers });
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Make Calls</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Upload CSV</label>
        <input type="file" accept=".csv" onChange={handleCSVUpload} className="w-full p-2 border rounded bg-transparent" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Enter Phone Number</label>
        <input 
          type="text" 
          value={manualNumber} 
          onChange={(e) => setManualNumber(e.target.value)} 
          className="w-full p-2 border rounded bg-transparent" 
        />
        <button onClick={handleManualAdd} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add Number</button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Campaign ID</label>
        <input 
          type="text" 
          value={campaignID} 
          onChange={(e) => setCampaignID(e.target.value)} 
          className="w-full p-2 border rounded bg-transparent" 
        />
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={handleMakeCalls} className="bg-green-500 text-white px-4 py-2 rounded">Make Calls</button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Phone Numbers</h3>
        <ul>
          {phoneNumbers.map((number, index) => (
            <li key={index} className="p-2 border rounded mb-2">{number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MakeCalls;
