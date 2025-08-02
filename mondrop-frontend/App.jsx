import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const checkEligibility = async () => {
    try {
      setError('');
      setResult(null);
      const res = await axios.get(`https://your-backend-url/api/check?address=${address}`);
      setResult(res.data);
    } catch (err) {
      setError('Invalid address or server error.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>MonDrop Airdrop Checker</h1>
      <input
        type="text"
        placeholder="Enter your wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={checkEligibility} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Check
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
