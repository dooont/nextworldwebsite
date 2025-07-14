import React, { useState } from 'react';
import heroBackgroundVideo from '../../assets/events-nextworld-hero-background.mp4';
import { useEffect } from 'react';
import axios from 'axios';
import AdminUpcomingEvents from '../../components/adminComponents/AdminUpcomingEvents';
import AdminPastEvents from '../../components/adminComponents/AdminPastEvents';

// Template
//     id: 0,
//     image: new URL('../assets/nextworld-mic-white.png', import.meta.url).href,
//     title: '',
//     subtitle: 'Month Day, Year',
//     url: '',

//fetching should be done here, then pass to the children


export default function AdminEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [pastEvents, setPastEvents] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function getUpcomingEvents() {
      try {
        const response = await axios.get('http://localhost:3000/upcoming-events', {
          withCredentials: true
        });
        //sort events descending by date
        const sortedEvents = response.data.upcomingEvents.slice().sort((a, b) => {
          const dateA = new Date(a.subtitle);
          const dateB = new Date(b.subtitle);
          return dateB - dateA;
        });
        setUpcomingEvents(sortedEvents);
      } catch (e) {
        setUpcomingEvents(null);
      }

    };

    async function getPastEvents() {
      try {
        const response = await axios.get("http://localhost:3000/past-events", {
          withCredentials: true
        });
        setPastEvents(response.data.pastEvents);
        console.log(response.data.pastEvents);
      } catch (e) {
        setPastEvents(null);
      }
    }
    getUpcomingEvents();
    getPastEvents();
  }, [refreshKey]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  function handleRefreshPage() {
    setRefreshKey((curr) => curr + 1);
  }


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
        <AdminUpcomingEvents upcomingEvents={upcomingEvents} onRefreshPage={handleRefreshPage} />


        <h2 className="text-5xl text-white font-bold mb-6 racing-sans-one-regular">
          Past Events
        </h2>
        <AdminPastEvents pastEvents={pastEvents} handleEventClick={handleEventClick} onRefreshPage={handleRefreshPage} />
      </section>

      {/* Simple Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute w-screen h-screen inset-0 bg-black/50"
            onClick={closeModal}
          />
          <div
            className="relative bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-2 racing-sans-one-regular">{selectedEvent.title}</h3>
            <p className="text-gray-600 mb-4 bebas-kai-regular">{new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            }).format(new Date(selectedEvent.subtitle.split('T')[0]))}</p>
            {selectedEvent.desc && (
              <p className="text-gray-800 mb-4 oswald-400">{selectedEvent.desc}</p>
            )}
            {selectedEvent.place && (
              <p className="text-gray-700 italic mb-4 bebas-kai-regular">Location: {selectedEvent.place}</p>
            )}
            {selectedEvent.artists.length > 0 && (
              <>
                <h4 className="text-lg font-semibold mb-2 racing-sans-one-regular">Artists</h4>
                <ul className="list-disc list-inside mb-4 oswald-400">
                  {selectedEvent.artists.map((artist) => {
                    const handle = artist.contact;
                    return (
                      <li key={handle}>
                        <a
                          href={`https://www.instagram.com/${handle}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-800 hover:underline"
                        >
                          {artist.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            <img
              src={selectedEvent.imageURL}
              alt={selectedEvent.title}
              className="w-full h-96 object-contain rounded mb-4"
            />
            <button
              onClick={closeModal}
              className="mt-2 px-4 py-2 bg-purple-950 text-white rounded hover:bg-purple-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
