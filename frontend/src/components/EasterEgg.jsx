import React, { useState, useEffect, useRef } from 'react';
import deezNuts from '../assets/deeznuts.jpg';

const developers = [
  {
    name: 'Matthew Maung',
    role: 'Software Engineer',
    contact: 'matthewmaung@nyu.edu',
  },
  {
    name: 'Elton Salanic',
    role: 'Software Engineer',
    contact: 'elton.salanic@gmail.com',
  },
];

export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const devSequence = ['d', 'e', 'v'];
  const konamiSequence = [
    'ArrowUp','ArrowUp',
    'ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight',
    'ArrowLeft','ArrowRight',
    'b','a'
  ];

  const posDevRef = useRef(0);
  const posKonamiRef = useRef(0);

  // listen for the sequences "dev" or Konami
  useEffect(() => {
    const handleSequence = (e) => {
      const key = e.key;
      const keyLower = key.toLowerCase();

      // DEV sequence
      if (keyLower === devSequence[posDevRef.current]) {
        posDevRef.current += 1;
        if (posDevRef.current === devSequence.length) {
          setOpen(true);
          posDevRef.current = 0;
        }
      } else {
        posDevRef.current = keyLower === devSequence[0] ? 1 : 0;
      }

      // Konami sequence
      if (key === konamiSequence[posKonamiRef.current]) {
        posKonamiRef.current += 1;
        if (posKonamiRef.current === konamiSequence.length) {
          setOpen(true);
          posKonamiRef.current = 0;
        }
      } else {
        posKonamiRef.current = key === konamiSequence[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleSequence);
    return () => window.removeEventListener('keydown', handleSequence);
  }, []);

  // listen for Escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open]);

  return (
    <>
      {/* invisible hotspot if you still want click-based secret */}
      <div
        className="fixed top-0 left-0 w-8 h-8 z-50 cursor-pointer"
        title="(shh… secret)"
      />

      {open && (
        // backdrop: click to close
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* dialog: stop propagation so clicking inside won't close */}
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl cursor-pointer"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Site Developers</h2>
            <ul className="space-y-4">
              {developers.map((dev) => (
                <li key={dev.name} className="space-y-1">
                  <p className="font-semibold">{dev.name}</p>
                  <p className="text-sm text-gray-600">{dev.role}</p>
                  <a
                    href={`mailto:${dev.contact}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {dev.contact}
                  </a>
                </li>
              ))}
            </ul>
            <img src={deezNuts} className="mt-4"></img>
          </div>
        </div>
      )}
    </>
  );
}
