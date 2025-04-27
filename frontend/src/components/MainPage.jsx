import React from 'react';

import nextworldWhite from '../assets/mainLogoWhite.png';

const MainPage = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        {/* Replace with <img> or <video> below */}
        <img
          src="/path/to/hero.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/*
        <video
          src="/path/to/hero.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        */}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-between max-w-6xl mx-auto h-full px-6">
        {/* Logo on Left */}
        <div className="w-1/4">
          <img
            src={nextworldWhite}
            alt="Logo"
            className="object-contain"
          />
        </div>

        {/* Text and Button on Right */}
        <div className="w-3/4 text-right text-white">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Our Site
          </h1>
          <p className="mb-6 text-lg">
            Discover amazing content and engage with our vibrant community.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
