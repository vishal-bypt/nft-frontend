import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [response, setResponse] = useState(null);

  const fetchHello = async () => {
    const res = await fetch('/api/hello');
    const data = await res.json();
    setMessage(data.message);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Next.js API Demo</h1>

      <button onClick={fetchHello}>Call /api/hello</button>
      {message && <p>API Response: {message}</p>}

      <hr />

      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit to /api/user</button>
      </form>

      {response && (
        <div>
          <h3>Response from /api/user:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
