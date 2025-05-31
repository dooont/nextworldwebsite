import { NavLink } from 'react-router-dom';
// Import your logo correctly
import nextworldWhiteMic from '../../assets/nextworld-mic-white.png'; // default import for asset

export default function AdminHeader() {
  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-10xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={nextworldWhiteMic}
            alt="Logo"
            className="h-20 object-fill"
            onClick={() => window.location.href = '/'}
          />
        </div>

        <h2 className="text-white text-2xl bebas-kai-regular">Admin View</h2>

        {/* Navigation Links */}
        <ul className="flex space-x-5 bebas-kai-regular">
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
              to="/gallery"
              className={({ isActive }) =>
                `text-[20px] ${isActive ? 'text-purple-900 font-semibold' : 'text-white hover:text-purple-500'}`
              }
            >
              Gallery
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}