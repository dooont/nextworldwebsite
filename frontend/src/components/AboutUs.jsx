import React, { useState } from 'react';
import aboutHero from '../assets/aboutUsHero1.jpg';
import missionHero from '../assets/aboutUsHero2.jpg';
import testHero from '../assets/aboutUsHero4.jpg';
import MembersContainer from './MembersContainer.jsx';




export default function AboutUsComponent(){ 
  return (
    <div className="bg-black">
      {/* About Us Hero */}
      <section
        className="relative w-screen h-screen bg-cover lg:bg-fixed lg:bg-fill"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4">
          <h1 className="text-7xl lg:text-9xl font-bold text-white racing-sans-one-regular fade-in delay-200">
            About Us
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 bebas-kai-regular max-w-2xl fade-in delay-400 add-shadow">
            Next World Collective is a LA-based creative community born from a simple desire: “friendship through music.” We provide hands-on mentorship and a space to experiment, whether it’s through recording sessions, songwriting, production, jam nights, community events, or full-scale concert showcases. With members spread across the country and beyond, from musicians to graphic designers, our community thrives on genuine connection, curiosity, and shared creative energy. There’s no formal way to join—if we vibe, we create. Together, we’re shaping the next world of music.          </p>
        </div>
      </section>

      {/* Our Mission Hero */}
      <section
        className="relative w-screen h-[101vh] bg-cover bg-center lg:bg-fixed lg:bg-center lg:bg-cover"
        style={{ backgroundImage: `url(${testHero})` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-7xl lg:text-8xl font-semibold text-white racing-sans-one-regular fade-in delay-200">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed oswald-400 text-xl lg:text-2xl fade-in delay-400 add-shadow">
            "Next World Collective is a platform for unheard voices."
            We exist to spotlight emerging artists who are often overlooked despite their talent and dedication. Our mission is to connect these creators with audiences who love to discover new music. Through authentic support, collaborative spaces, and powerful live experiences, we help eager creatives take the next step in their careers, especially when no one else will.
          </p>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="space-y-8 max-w-screen-xl mx-auto px-4 py-10">
        <h2 className="text-5xl font-semibold text-center text-white racing-sans-one-regular">
          Meet the Team
        </h2>
        <MembersContainer type="exec" title="Executive Team" />
        <MembersContainer type="other" title="Major Contributors" />
      </section>
    </div>
  );
}
