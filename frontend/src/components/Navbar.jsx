import React from 'react';
import { NavLink } from 'react-router-dom';
import nextworldMicWhite from '../assets/nextworld-mic-white.png';

export default function Navbar() {
  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={nextworldMicWhite}
            alt="Logo"
            className="h-8 object-contain"
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-white hover:text-blue-400'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-white hover:text-blue-400'
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-white hover:text-blue-400'
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meet-the-team"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-white hover:text-blue-400'
              }
            >
              Meet The Team
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
