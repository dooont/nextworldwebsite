import React from 'react';
import Masonry from 'react-masonry-css';

const photos = Array.from({ length: 89 }, (_, i) =>
  new URL(
    `../assets/carousel-gallery/nextworld-carousel-${i + 1}.jpg`,
    import.meta.url
  ).href
);

export default function PhotoWall() {
  const breakpointColumnsObj = { default: 5, 1280: 4, 1024: 3, 640: 2, 0: 1 };

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-white text-9xl font-bold text-center racing-sans-one-regular mb-8">
        Gallery
      </h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4"
      >
        {photos.map((src, idx) => (
          <div key={idx} className="mb-4 overflow-hidden rounded-lg">
            <img
              src={src}
              alt={`Photo ${idx + 1}`}
              // fade-in animation via inline style
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
  );
}
