import React, { useState } from 'react';

const dummyEvents = [
  { id: 1, image: '/path/to/event1.jpg', title: 'Event One', subtitle: 'January 1, 2025' },
  { id: 2, image: '/path/to/event2.jpg', title: 'Event Two', subtitle: 'February 14, 2025' },
  { id: 3, image: '/path/to/event3.jpg', title: 'Event Three', subtitle: 'March 30, 2025' },
  { id: 4, image: '/path/to/event4.jpg', title: 'Event Four', subtitle: 'April 10, 2025' },
];

const carouselImages = [
  '/path/to/carousel1.jpg',
  '/path/to/carousel2.jpg',
  '/path/to/carousel3.jpg',
];

export default function EventsMedia({ events = dummyEvents, images = carouselImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((idx) => (idx === images.length - 1 ? 0 : idx + 1));
  };

  return (
    <div className="space-y-16">
      {/* Events Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Past Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Carousel */}
      <section className="relative max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500"
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((src, idx) => (
              <div key={idx} className="min-w-full h-64">
                <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            ›
          </button>
        </div>
      </section>
    </div>
  );
}
