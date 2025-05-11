import React, { useState } from 'react';
import heroBackgroundVideo from '../assets/events-nextworld-hero-background.mp4';

const defaultUpcomingEvents = [
  {
    id: 11,
    image: new URL('../public/assets/11.jpg', import.meta.url).href,
    title: 'Next World Showcase @ The Paramount v.2',
    subtitle: 'June 29, 2025',
    url: 'https://link.dice.fm/F6cb912c26af?dice_id=F6cb912c26af',
  },
  {
    id: 0,
    image: new URL('../assets/nextworld-mic-white.png', import.meta.url).href,
    title: 'More to be Announced!',
    subtitle: 'Dates TBA',
    url: 'https://www.instagram.com/nxtworldco/',
  },
];

const dummyEvents = [
  {
    id: 10,
    image: new URL('../public/assets/10.png', import.meta.url).href,
    title: 'CraftxNXTWORLD v.4',
    subtitle: 'April 12, 2025',
  },
  {
    id: 9,
    image: new URL('../public/assets/9.jpg', import.meta.url).href,
    title: 'CraftxNXTWORLD v.3',
    subtitle: 'October 19, 2024',
  },
  {
    id: 8,
    image: new URL('../public/assets/8.jpg', import.meta.url).href,
    title: 'Next World Exclusive @ Pauhaus',
    subtitle: 'September 7, 2024',
  },
  {
    id: 7,
    image: new URL('../public/assets/7.jpg', import.meta.url).href,
    title: 'CraftxNXTWORLD v.2',
    subtitle: 'July 20, 2024',
  },
  {
    id: 6,
    image: new URL('../public/assets/6.jpg', import.meta.url).href,
    title: 'Next World Showcase @ The Paramount',
    subtitle: 'June 23, 2024',
  },
  {
    id: 5,
    image: new URL('../public/assets/5.jpg', import.meta.url).href,
    title: 'CraftxNXTWORLD v.1',
    subtitle: 'February 23, 2024',
  },
  {
    id: 4,
    image: new URL('../public/assets/4.jpg', import.meta.url).href,
    title: 'Fall Into The Next World',
    subtitle: 'October 14, 2023',
  },
  {
    id: 3,
    image: new URL('../public/assets/3.jpg', import.meta.url).href,
    title: 'Next World Spring Exclusive',
    subtitle: 'April 29, 2023',
  },
  {
    id: 2,
    image: new URL('../public/assets/2.jpg', import.meta.url).href,
    title: 'Next World Winter Exclusive',
    subtitle: 'January 14, 2023',
  },
  {
    id: 1,
    image: new URL('../public/assets/1.jpg', import.meta.url).href,
    title: 'NextWorld Collective',
    subtitle: 'November 12, 2022',
  },
];



export default function EventsMedia({ events = dummyEvents, upcomingEvents = defaultUpcomingEvents }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="relative space-y-16 bg-black">
      {/* Hero Section */}
      <div className="relative w-screen h-screen overflow-hidden">
        <video
          src={heroBackgroundVideo}
          playsInline
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-[100vw] h-[120vh] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="relative z-20 flex items-center justify-center h-full">
          <h1 className="text-white text-6xl lg:text-[10rem] font-bold text-center racing-sans-one-regular fade-in-up delay-200">
            EVENTS
          </h1>
        </div>
      </div>

      {/* Events Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl text-white font-bold mb-6 racing-sans-one-regular">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr mb-8">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => window.open(event.url, '_blank')}
              className="group bg-purple-950 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-40 w-full overflow-hidden bg-[#4b0082]">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#4b0082] bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-xl font-semibold text-white bebas-kai-regular">
                  {event.title}
                </h3>
                <p className="text-gray-200 text-sm oswald-400">
                  {event.subtitle}
                </p>
              </div>
            </div>
          ))}

        </div>

        <h2 className="text-5xl text-white font-bold mb-6 racing-sans-one-regular">
          Past Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="group bg-purple-950 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-40 w-full overflow-hidden bg-[#4b0082]">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#4b0082] bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-xl font-semibold text-white bebas-kai-regular">
                  {event.title}
                </h3>
                <p className="text-gray-200 text-sm oswald-400">
                  {event.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute w-screen h-screen inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-lg p-6 max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
            <p className="mb-4">{selectedEvent.subtitle}</p>
            <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-96 object-contain rounded mb-4" />
            <button onClick={closeModal} className="mt-2 px-4 py-2 bg-purple-950 text-white rounded hover:bg-purple-800">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
