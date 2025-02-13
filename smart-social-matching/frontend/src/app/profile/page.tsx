"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  userId: number;
  username: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  // Function to fetch the profile data from the backend
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token is found, redirect to login page
        router.push('/login');
        return;
      }
      const res = await fetch('http://localhost:3000/user/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        // Token is invalid or expired; redirect to login
        router.push('/login');
        return;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await res.json();
      setProfile(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <p>
        <span className="font-semibold">User ID:</span> {profile.userId}
      </p>
      <p>
        <span className="font-semibold">Username:</span> {profile.username}
      </p>
    </div>
  );
};

export default ProfilePage;
