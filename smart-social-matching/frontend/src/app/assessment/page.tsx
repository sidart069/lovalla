"use client";

import { useState } from 'react';

const AssessmentPage = () => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question1, question2 }),
      });
      if (!res.ok) {
        throw new Error('Failed to process assessment');
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing your assessment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Personality Assessment</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-2">Question 1: Do you prefer spending time alone or with others?</span>
          <input
            type="text"
            value={question1}
            onChange={(e) => setQuestion1(e.target.value)}
            placeholder="Your answer..."
            className="p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-2">Question 2: How do you handle stressful situations?</span>
          <input
            type="text"
            value={question2}
            onChange={(e) => setQuestion2(e.target.value)}
            placeholder="Your answer..."
            className="p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Assessment'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 p-4 border border-gray-200 rounded">
          <h2 className="text-xl font-bold mb-2">Assessment Result:</h2>
          <p>
            <strong>Personality:</strong> {result.personality}
          </p>
          <p>
            <strong>Compatibility Score:</strong> {result.compatibilityScore}
          </p>
          <p>
            <strong>Feedback:</strong> {result.feedback}
          </p>
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;
