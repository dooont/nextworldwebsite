import React from 'react';

const teamMembers = [
  { id: 1, name: 'Kai Caden', role: 'CEO', photo: new URL('../assets/meet-the-team/kai-tano.jpg', import.meta.url).href},
  { id: 2, name: 'Brynne Matuan', role: 'President', photo: new URL('../assets/meet-the-team/brynne.jpg', import.meta.url).href },
  { id: 3, name: 'Kurt Buencamino', role: 'Designer', photo: new URL('../assets/meet-the-team/kurt.png', import.meta.url).href },
  { id: 4, name: 'Harmony Calata', role: 'Developer', photo: new URL('../assets/meet-the-team/harmony.jpg', import.meta.url).href },
  { id: 5, name: 'Allison Budianto', role: 'Developer', photo: new URL('../assets/meet-the-team/allison.jpg', import.meta.url).href },
  // …add as many as you like
];

export default function AboutUsComponent() {
  return (
    <div className="px-4 py-16 max-w-6xl mx-auto space-y-16 bg-black">
      {/* Hero / Intro */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">About Us</h1>
        <p className="text-lg text-gray-300">
          We’re NextWorld Collective—driven by creativity, community, and live experiences.
        </p>
      </section>

      {/* Mission / Story */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
          Cras venenatis euismod malesuada.
        </p>
      </section>

      {/* Meet the Team */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-center text-white">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-purple-950 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-72 object-cover object-top"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-medium text-white">{member.name}</h3>
                <p className="text-gray-400 text-white">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
