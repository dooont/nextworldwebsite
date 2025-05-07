import React, { useState } from 'react';

const teamMembers = [
  { id: 1, name: 'Kai Caden', role: 'CEO', photo: new URL('../assets/meet-the-team/kai-tano.jpg', import.meta.url).href },
  { id: 2, name: 'Brynne Matuan', role: 'President', photo: new URL('../assets/meet-the-team/brynne.jpg', import.meta.url).href },
  { id: 3, name: 'Kurt Buencamino', role: 'Designer', photo: new URL('../assets/meet-the-team/kurt.png', import.meta.url).href },
  { id: 4, name: 'Harmony Calata', role: 'Developer', photo: new URL('../assets/meet-the-team/harmony.jpg', import.meta.url).href },
  { id: 5, name: 'Allison Budianto', role: 'Developer', photo: new URL('../assets/meet-the-team/allison.jpg', import.meta.url).href },
  // …add as many as you like
];

export default function AboutUsComponent() {
  const [selectedMember, setSelectedMember] = useState(null);

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
        <h2 className="text-2xl font-semibold text-center text-white">
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
                <h3 className="text-xl font-medium text-white">
                  {member.name}
                </h3>
                <p className="text-gray-400">{member.role}</p>
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
                {/* replace with real bio/content */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam.
                </p>
                <p>
                  Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
                  sagittis ipsum. Praesent mauris.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
