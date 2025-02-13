"use client";

import { useState } from 'react';

interface UserProfile {
  id: number;
  username: string;
  personality: string;
}

interface MatchingResults {
  [key: string]: UserProfile[];
}

const MatchingPage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [results, setResults] = useState<MatchingResults | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // For demonstration, we'll simulate a list of user profiles.
  const simulateUsers: UserProfile[] = [
    { id: 1, username: "Sid", personality: "Extrovert" },
    { id: 2, username: "Jash", personality: "Introvert" },
    { id: 3, username: "Omar", personality: "Introvert" },
    { id: 4, username: "ishika", personality: "Introvert" },
  ];

  // Trigger matching via a POST request to the backend.
  const runMatching = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulateUsers),
      });
      if (!res.ok) {
        throw new Error('Failed to run matching');
      }
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during matching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Matching Results</h1>
      <button
        onClick={runMatching}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Run Matching
      </button>
      {loading && <p>Loading matching results...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {results && (
        <div className="space-y-4">
          {Object.entries(results).map(([personality, users]) => (
            <div key={personality} className="border p-4 rounded">
              <h2 className="text-xl font-bold mb-2">
                {personality} Group ({users.length} users)
              </h2>
              <ul className="list-disc ml-6">
                {users.map((user) => (
                  <li key={user.id}>{user.username}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchingPage;
