import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [personData, setPersonData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error
    try {
      const response = await axios.get(`https://private-production-c90c.up.railway.app/api/find-person/${mobileNumber}`);
      setPersonData(response.data); // Assuming response.data is an object with 'name' and 'mobile' properties
    } catch (error) {
      setError('Person not found or there was an error fetching data.');
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Phone Directory</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Mobile Number:
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>}

      {personData && (
        <div className="person-details">
          <h2>Person Details</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{personData.name}</td>
                <td>{personData.mobileNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
