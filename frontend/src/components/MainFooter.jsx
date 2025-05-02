import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React from 'react';
// import tiktokIcon from '../assets/tiktok-white.png';


export default function MainFooter() {
  return (
    <footer className="bg-black border-t border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Copyright Text */}
        <p className="text-sm text-gray-600 mb-4 md:mb-0">
          © 2025 NextWorld Collective <br />
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/nxtworldco/" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" className="h-6 w-6" />
          </a>
          {/* <a href="https://tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer">
            <img src={tiktokIcon} alt="TikTok" className="h-6 w-6" />
          </a> */}
          <a href="https://www.youtube.com/@nxtworldco" target="_blank" rel="noopener noreferrer">
            <img src={YouTubeIcon} alt="YouTube" className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
