import React, { useState } from 'react';
import aboutHero from '../assets/aboutUsHero1.jpg';
import missionHero from '../assets/aboutUsHero2.jpg';

const teamMembers = [
  {
    id: 1,
    name: 'Kai Caden',
    role: 'CEO',
    photo: new URL('../assets/meet-the-team/kai-tano.jpg', import.meta.url).href,
    desc: `Kai Caden is based within the San Fernando Valley and loves to  play saxophone, write music, and host concerts. He loves being a part of Next World because of its loving community and the support he receives for his music endeavors. He does his best to pay the community back by organizing Next World’s concert/mixer productions. `,
    funFact: ' I manage two artists currently cause I wanted to try it. No one told me that they can make fun of you for no reason. (thx Brynne & Harmony)'
  },
  {
    id: 2,
    name: 'Brynne Matuan',
    role: 'President',
    photo: new URL('../assets/meet-the-team/brynne.jpg', import.meta.url).href,
    desc: `I’m based in Los Angeles, aside from being the president of Next World, I’m also an artist and singer-songwriter. Next World has been a place for me to grow with other musicians and artists, and I love the environment we’ve been able to foster. Next World was started as a friend group, and it makes me happy to see that it still feels like that friend group it originally was.`,
    funFact: 'My manager sucks. he keeps playing 2k instead of managing me.'
  },
  {
    id: 3,
    name: 'Kurt Buencamino',
    role: 'Human Resources and A&R',
    photo: new URL('../assets/meet-the-team/kurt.png', import.meta.url).href,
    desc: `I am based in San Gabriel Valley and I love, songwriting, playing drum set ,music production, and writing synopsis for short films. Aside from creativity, Next World is a place where I can improve the lives of others. I believe that every person is capable of being good. Especially when they choose to listen and are in the right environment.`,
    funFact: 'I also run my own creative community called AV Studios Group Entertainment.'
  },
  {
    id: 4,
    name: 'Harmony Calata',
    role: 'Event Coordinator',
    photo: new URL('../assets/meet-the-team/harmony.jpg', import.meta.url).href,
    desc: `Harmony is based in Inland Empire and enjoys playing guitar, reading, and writing songs for people she loves. Her favorite part about being involved in Next World is its collaborative environment and the authenticity of everyone she works with. `,
    funFact: 'She is NOT in HR:)'
  },
  {
    id: 5,
    name: 'Allison Budianto',
    role: 'Creative Director & Content Executive',
    photo: new URL('../assets/meet-the-team/allison.jpg', import.meta.url).href,
    desc: `I love video editing and unsurprisingly watching movies. (everything everywhere all at once <3)
Next World will always hold a space in my heart because every event has brought me so many memories. These people have introduced me to a world I never thought I’d be in and i’m learning more and more everyday I am around them. My experience in Next World has brought out a new side of me that I wish came out sooner.`,
    funFact: 'I peaked ascendant in valorant (nerd)'
  },
];


export default function AboutUsComponent() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="bg-black">
      {/* About Us Hero */}
      <section className="relative w-screen h-screen overflow-hidden">
        {/* Full-bleed background image */}
        <img
          src={aboutHero}
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4">
          <h1 className="text-8xl font-bold text-white racing-sans-one-regular">
            About Us
          </h1>
          <p className="text-lg text-gray-300 bebas-kai-regular">
            We’re NextWorld Collective—driven by creativity, community, and live experiences.
          </p>
        </div>
      </section>

      {/* Our Mission Hero */}
      <section className="relative w-screen h-[102vh] overflow-hidden">
        <img
          src={missionHero}
          alt="Our Mission Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4">
          <h2 className="text-6xl font-semibold text-white racing-sans-one-regular">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed oswald-400 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum.
          </p>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="space-y-8 max-w-screen-xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-semibold text-center text-white racing-sans-one-regular">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`
                group
                bg-purple-950
                rounded-lg
                overflow-hidden
                shadow-lg
                cursor-pointer
                transform transition
                hover:scale-105 hover:shadow-2xl
              `}
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-72 object-cover object-top"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-medium text-white bebas-kai-regular">
                  {member.name}
                </h3>
                <p className="text-gray-400 oswald-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Popup */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedMember(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Modal Content */}
          <div
            className="relative bg-gray-900 rounded-lg p-8 max-w-2xl w-full mx-4 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo on the left */}
            <img
              src={selectedMember.photo}
              alt={selectedMember.name}
              className="w-48 h-48 object-cover rounded-lg flex-shrink-0"
            />

            {/* Description on the right */}
            <div className="text-white flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">
                    {selectedMember.name}
                  </h3>
                  <p className="text-gray-400">{selectedMember.role}</p>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-500 hover:text-gray-300 text-2xl leading-none"
                >
                  &times;
                </button>
              </div>
              <div className="mt-4 prose prose-invert text-gray-300">
                <p>
                  {selectedMember.desc}
                </p>
                <p>
                  <strong>Fun Fact:</strong> {selectedMember.funFact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
