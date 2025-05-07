import React, { useState } from 'react';
import heroBackgroundVideo from '../assets/events-nextworld-hero-background.mp4';

const dummyEvents = [
  { id: 11, image: 'src/assets/11.jpg', title: 'Next World Showcase @ The Paramount v.2', subtitle: 'June 29, 2025' },
  { id: 10, image: 'src/assets/10.png', title: 'CraftxNXTWORLD v.4', subtitle: 'April 12, 2025' },
  { id: 9, image: 'src/assets/9.jpg', title: 'CraftxNXTWORLD v.3', subtitle: 'October 19, 2024' },
  { id: 8, image: 'src/assets/8.jpg', title: 'Next World Exclusive @ Pauhaus', subtitle: 'September 7, 2024' },
  { id: 7, image: 'src/assets/7.jpg', title: 'CraftxNXTWORLD v.2', subtitle: 'July 20, 2024' },
  { id: 6, image: 'src/assets/6.jpg', title: 'Next World Showcase @ The Paramount', subtitle: 'June 23, 2024' },
  { id: 5, image: 'src/assets/5.jpg', title: 'CraftxNXTWORLD v.1', subtitle: 'February 23, 2024' },
  { id: 4, image: 'src/assets/4.jpg', title: 'Fall Into The Next World', subtitle: 'October 14, 2023' },
  { id: 3, image: 'src/assets/3.jpg', title: 'Next World Spring Exclusive', subtitle: 'April 29, 2023' },
  { id: 2, image: 'src/assets/2.jpg', title: 'Next World Winter Exclusive', subtitle: 'January 14, 2023' },
  { id: 1, image: 'src/assets/1.jpg', title: 'NextWorld Collective', subtitle: 'November 12, 2022' },
  { id: 0, image: 'src/assets/nextworld-mic-white.png', title: 'More to be Announced!', subtitle: 'TBD' },
];


const carouselImages = Array.from({ length: 91 }, (_, i) =>
  `src/assets/carousel-gallery/nextworld-carousel-${i + 1}.jpg`
);



export default function EventsMedia({ events = dummyEvents, images = carouselImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((idx) => (idx === images.length - 1 ? 0 : idx + 1));
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    // for demo, we just store it in state
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const [currentIndexCarousel, setCurrentIndexCarousel] = useState(0);

  const prevSlideCarousel = () =>
    setCurrentIndexCarousel((i) => Math.max(i - 1, 0));
  const nextSlideCarousel = () =>
    setCurrentIndexCarousel((i) =>
      Math.min(i + 1, carouselImages.length - 1)
    );

  return (
    <div className="relative space-y-16 bg-black">
      {/* Hero Section */}
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Background Video */}
        <video
          src={heroBackgroundVideo}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-[100vw] h-[120vh] object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10" />

        {/* Hero Text */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <h1 className="text-white text-8xl font-bold text-center">Events and Media</h1>
        </div>
      </div>

      {/* Events Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl text-white font-bold mb-6">Past Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="group relative bg-purple-950 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-center text-white px-4">
                    Learn more about {event.title}!
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">{event.title}</h3>
                <p className="text-gray-200 text-sm">{event.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 1) Backdrop */}
          <div
            className="absolute w-screen h-screen inset-0 bg-black/50"
            onClick={closeModal}
          />

          {/* 2) Modal panel */}
          <div
            className="relative bg-white rounded-lg p-6 max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
            <p className="mb-4">{selectedEvent.subtitle}</p>
            <img
              src={selectedEvent.image}
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


      {/* Image Carousel */}
      <section className="relative max-w-4xl mx-auto min-h-[600px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Gallery</h2>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndexCarousel * 100}%)` }}
          >
            {carouselImages.map((src, idx) => (
              <div key={idx} className="min-w-full h-screen">
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlideCarousel}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={nextSlideCarousel}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            ›
          </button>
        </div>
      </section>
    </div>

  );
}
