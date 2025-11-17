import React from 'react';
import logoWhite from '../../assets/mainLogoWhite.png';

export default function AdminLogin() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 fade-in">
          <img 
            src={logoWhite} 
            alt="Next World Collective Logo" 
            className="h-24 mx-auto mb-6 object-contain"
          />
          <h1 className="text-5xl font-bold text-white racing-sans-one-regular mb-2">
            Admin Portal
          </h1>
        </div>

        {/* Login Pane*/}
        <div className="bg-gray-900 rounded-lg shadow-2xl p-8 fade-in delay-200">
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-white oswald-400 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-black border-1 border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-white oswald-400 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 bg-black border-1 border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                placeholder="Password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <a 
                href="#" 
                className="text-purple-500 hover:text-purple-400 oswald-400 text-sm transition"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-950 hover:bg-purple-800 text-white rounded-lg font-semibold oswald-700 text-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-900/50"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="mt-8 text-center fade-in delay-400">
          <p className="text-gray-600 oswald-400 text-sm">
            © Next World Collective
          </p>
        </div>
      </div>
    </div>
  );
}
