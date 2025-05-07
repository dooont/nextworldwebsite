import InstagramIcon from '../assets/instagram-new.png';
import YouTubeIcon from '../assets/youtube-logo.png';
import TiktokIcon from '../assets/tiktok-logo.png';
import React from 'react';
// import tiktokIcon from '../assets/tiktok-white.png';


export default function MainFooter() {
  return (
    <footer className="bg-black border-t py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Copyright Text */}
        <p className="text-sm text-gray-600 mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} <br />
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/nxtworldco/" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" className="h-6 w-6 object-contain" />
          </a>
          <a href="https://tiktok.com/@nxtworldco" target="_blank" rel="noopener noreferrer">
            <img src={TiktokIcon} alt="TikTok" className="h-6 w-5 object-contain" />
          </a>
          <a href="https://www.youtube.com/@nxtworldco" target="_blank" rel="noopener noreferrer">
            <img src={YouTubeIcon} alt="YouTube" className="h-6 w-6 object-contain" />
          </a>
        </div>
      </div>
    </footer>
  );
}
