import React, { useState } from 'react';
import axios from 'axios';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await axios.post('http://localhost:3000/admin/forgot-password', { email });
      setSuccess('If an account with that email exists, a reset link has been sent.');
    } catch (err) {
      setError('Unable to send reset link. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
        <h1 className="text-4xl font-bold text-center text-purple-950 racing-sans-one-regular mb-6">Forgot Password</h1>
        <p className="text-center text-gray-700 mb-6 oswald-400">
          Enter your admin email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2 bebas-kai-regular">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-800 oswald-400"
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-purple-950 text-white rounded hover:bg-purple-800 transition font-bold racing-sans-one-regular disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {success && <div className="mt-4 text-green-600 text-center oswald-400">{success}</div>}
        {error && <div className="mt-4 text-red-600 text-center oswald-400">{error}</div>}
      </div>
    </div>
  );
} 