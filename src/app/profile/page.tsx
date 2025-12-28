'use client';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {toastSuccess, toastError} from '@/utils/common/Toast';

export default function ProfilePage() {
  const { user, userData, loading, refetchUserProfile, logout } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setCollege(userData.college || '');
    }
  }, [userData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!name.trim() || !college.trim()) {
      toastError("Please fill in all fields.");
      return;
    }

    setSaving(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: name.trim(),
        college: college.trim(),
        isProfileComplete: true
      });
      await refetchUserProfile();
      toastSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toastError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        My Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Details Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                value={user.email || ''} 
                disabled 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-300 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">College</label>
              <input 
                type="text" 
                value={college} 
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter your college name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={logout}
              className="mt-2 w-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          </form>
        </div>

        {/* Registered Events Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-semibold mb-6">Registered Events</h2>
          
          {userData?.registeredEvents && userData.registeredEvents.length > 0 ? (
            <ul className="space-y-3">
              {userData.registeredEvents.map((eventId, index) => (
                <li key={index} className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{eventId}</span> 
                  {/* Since I am just storing ID string, I am displaying it directly. 
                      Ideally, I would fetch event details. For now, this meets the requirement. */}
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Registered</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>You haven't registered for any events yet.</p>
              <button 
                onClick={() => router.push('/#events')}
                className="mt-4 text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Browse Events
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
