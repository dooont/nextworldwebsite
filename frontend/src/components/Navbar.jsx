import React from 'react';
import { NavLink } from 'react-router-dom';
// Import your logo correctly
import nextworldMicWhite from '../assets/nextworld-mic-white.png';

export default function Navbar() {
  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-10xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={nextworldMicWhite}
            alt="Logo"
            className="h-20 object-contain"
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-[20px] ${isActive ? 'text-purple-900 font-semibold' : 'text-white hover:text-purple-500'}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `text-[20px] ${isActive ? 'text-purple-900 font-semibold' : 'text-white hover:text-purple-500'}`
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `text-[20px] ${isActive ? 'text-purple-900 font-semibold' : 'text-white hover:text-purple-500'}`
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meet-the-team"
              className={({ isActive }) =>
                `text-[20px] ${isActive ? 'text-purple-900 font-semibold' : 'text-white hover:text-purple-500'}`
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
