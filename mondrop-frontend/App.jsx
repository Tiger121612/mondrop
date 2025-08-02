import { useState } from 'react';

function App() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkEligibility = async () => {
    if (!address) return alert('Please enter wallet address');
    setLoading(true);

    try {
      const res = await fetch(`https://your-backend-url.com/check?address=${address}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error fetching eligibility:', err);
      setResult({ error: 'Something went wrong. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>MonDrop Airdrop Checker</h1>

      <input
        type="text"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />

      <button onClick={checkEligibility} style={{ padding: '10px 20px' }}>
        {loading ? 'Checking...' : 'Check Eligibility'}
      </button>

      {result && (
        <div style={{ marginTop: '20px', background: '#fff', padding: '15px', borderRadius: '8px' }}>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
