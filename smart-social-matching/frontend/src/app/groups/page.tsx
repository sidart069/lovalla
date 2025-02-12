"use client";
// frontend/pages/groups.tsx

import { useEffect, useState, FormEvent } from 'react';

interface Group {
  name: string;
}

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch groups from the backend
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/group');
      if (!response.ok) {
        throw new Error('Error fetching groups');
      }
      const data = await response.json();
      setGroups(data);
    } catch (err) {
      setError('Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  };

  // Fetch groups on component mount
  useEffect(() => {
    fetchGroups();
  }, []);

  // Handle form submission to create a new group
  const createGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGroupName }),
      });
      if (!response.ok) {
        throw new Error('Error creating group');
      }
      const newGroup = await response.json();
      setGroups([...groups, newGroup]);
      setNewGroupName('');
    } catch (err) {
      setError('Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Groups</h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <>
          {groups.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {groups.map((group, index) => (
                <li
                  key={index}
                  style={{
                    background: '#f9f9f9',
                    marginBottom: '1rem',
                    padding: '1rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(190, 28, 28, 0.1)',
                  }}
                >
                  {group.name}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: 'center' }}>No groups found. Create one!</p>
          )}
        </>
      )}

      <form onSubmit={createGroup} style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <input
          type="text"
          placeholder="Enter new group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          required
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
          }}
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default GroupsPage;
