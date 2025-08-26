import React, { useState } from 'react';
import useProfileData from '../hooks/useProfileData';
import { formatBaht } from '../utils/currency';

const ProfilePage = () => {
  // In a real app, isLoggedIn would come from an auth provider
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('auth_token'));
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');

  // Use hook to fetch profile data. baseUrl can be set to API server when available.
  const { data, loading, error, refresh } = useProfileData('');

  const handleAuth = async (isSignup) => {
    setAuthError('');
    try {
      const res = await fetch(`/api/auth/${isSignup ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isSignup ? { email, password, name } : { email, password }),
      });
      if (!res.ok) throw new Error('Auth failed');
      const json = await res.json();
      localStorage.setItem('auth_token', json.token);
      setIsLoggedIn(true);
      setShowLogin(true);
      // Refresh profile data after successful auth
      refresh();
    } catch (e) {
      setAuthError('Email atau password salah.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          {showLogin ? (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4 text-right">
                  <button type="button" className="text-sm text-orange-600 hover:underline" onClick={() => alert('Forgot Password placeholder. Integrate email service/OTP later.')}>Forgot Password?</button>
                </div>
                {authError && <p className="text-red-600 text-sm mb-2">{authError}</p>}
                <button onClick={() => handleAuth(false)} type="button" className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600">Login</button>
              </form>
              <p className="text-center mt-4 text-sm">
                Don't have an account? <button onClick={() => setShowLogin(false)} className="text-orange-600 hover:underline">Sign Up</button>
              </p>
            </div>
          ) : (
    <div>
              <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>
                {authError && <p className="text-red-600 text-sm mb-2">{authError}</p>}
                <button onClick={() => handleAuth(true)} type="button" className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600">Sign Up</button>
              </form>
              <p className="text-center mt-4 text-sm">
                Already have an account? <button onClick={() => setShowLogin(true)} className="text-orange-600 hover:underline">Login</button>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const source = data;

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Profile</h1>

        {/* User Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Details</h2>
      {loading ? (
            <p>Loading profile...</p>
      ) : error ? (
            <div>
              <p className="text-red-500">Failed to load profile. Showing offline data.</p>
              <button onClick={refresh} className="mt-2 text-sm text-orange-600">Retry</button>
            </div>
          ) : (
            <>
              {!editing ? (
                <>
                  <p><strong>Name:</strong> {source?.profile?.name}</p>
                  <p><strong>Email:</strong> {source?.profile?.email}</p>
                  <p><strong>Saved Address:</strong> {source?.profile?.address}</p>
                  <div className="mt-4 flex gap-4">
                    <button onClick={()=>{setEditing(true); setEditName(source?.profile?.name||''); setEditAddress(source?.profile?.address||'');}} className="text-orange-600 hover:underline">Edit Profile</button>
                    <button onClick={()=>{localStorage.removeItem('auth_token'); setIsLoggedIn(false);}} className="text-red-600 hover:underline">Logout</button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input value={editName} onChange={(e)=>setEditName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea value={editAddress} onChange={(e)=>setEditAddress(e.target.value)} rows={3} className="mt-1 w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={async()=>{
                      const token = localStorage.getItem('auth_token');
                      await fetch('/api/users/me', { method:'PATCH', headers: { 'Content-Type': 'application/json', ...(token? { Authorization: `Bearer ${token}`} : {}) }, body: JSON.stringify({ name: editName, address: editAddress })});
                      setEditing(false); refresh();
                    }} className="bg-orange-500 text-white font-bold py-2 px-4 rounded">Save</button>
                    <button onClick={()=>setEditing(false)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Order History: only shown when backend provides orders */}
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
            <p>Loading orders...</p>
          </div>
        ) : source?.orders && source.orders.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
            <div className="space-y-4">
              {source.orders.map((order) => {
                const itemsText = Array.isArray(order.items)
                  ? order.items.map((it) => (typeof it === 'string' ? it : it?.name)).filter(Boolean).join(', ')
                  : '';
                const dateText = order.date ? new Date(order.date).toLocaleDateString() : (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '');
                return (
                <div key={order.id} className="border p-4 rounded-md hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{dateText}</p>
                      <p className="mt-2 text-gray-700">{itemsText}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatBaht(order.total)}</p>
                      <span className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              );})}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
            <p className="text-gray-600">No order history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
