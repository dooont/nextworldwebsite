import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';

const photos = Array.from({ length: 89 }, (_, i) =>
  new URL(
    `../assets/carousel-gallery/nextworld-carousel-${i + 1}-min.jpg`,
    import.meta.url
  ).href
);

export default function PhotoWall() {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  // close on Escape
  useEffect(() => {
    if (selected) {
      setIsOpen(true);
      const onEsc = (e) => e.key === 'Escape' && closeModal();
      window.addEventListener('keydown', onEsc);
      return () => window.removeEventListener('keydown', onEsc);
    }
  }, [selected]);

  const openModal = (src) => setSelected(src);

  const closeModal = () => {
    // start fade‐out
    setIsOpen(false);
    // after animation, actually unmount
    setTimeout(() => setSelected(null), 200);
  };

  const breakpointColumnsObj = {
    default: 5,
    1280: 4,
    1024: 3,
    640: 2,
    0: 1,
  };

  return (
    <>
      {/* Gallery */}
      <div className="max-w-screen-xl mx-auto px-4">
        <h1
          className="
    text-white text-6xl md:text-9xl font-bold text-center
    racing-sans-one-regular mb-8
    fade-in-up delay-200
  "
        >
          Gallery
        </h1>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4"
        >
          {photos.map((src, idx) => (
            <div
              key={idx}
              className="mb-4 overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
              onClick={() => openModal(src)}
            >
              <img
                src={src}
                alt={`Photo ${idx + 1}`}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-in-out forwards`,
                  animationDelay: `${idx * 100}ms`,
                }}
                className="w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          ))}
        </Masonry>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/70 transition-opacity duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selected}
              alt="Enlarged"
              className={`
                w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-xl
                transition-transform duration-300
                ${isOpen ? 'scale-100' : 'scale-95'}
              `}
            />
          </div>
        </div>
      )}
    </>
  );
}
