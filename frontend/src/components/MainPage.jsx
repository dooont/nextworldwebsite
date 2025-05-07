import React from 'react';

import nextworldWhite from '../assets/mainLogoWhite.png';
import heroBackgroundVideo from '../assets/main-page-nextworld-hero-background.mp4';

const MainPage = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        {/* hero image below */}
        <video
          src={heroBackgroundVideo}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-between max-w-6xl mx-auto h-full px-6">
        {/* Logo on Left */}
          <div className="w-3/4 mr-4 pr-4">
            <img
              src={nextworldWhite}
              alt="Logo"
              className="object-contain"
            />
          </div>

          {/* Text and Button on Right */}
        <div className="w-3/4 text-right text-white">
          <h1 className="text-8xl font-bold mb-4 racing-sans-one-regular">
            Next World Collective
          </h1>
          <p className="mb-6 text-xl oswald-400">
            The best place to find your new favorite artist
          </p>
          {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
            Get Started
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default MainPage;
