import React, { useRef, useState, useEffect } from 'react';

// Wrap any element that you want to fade in/out on scroll
export default function FadeInOnScroll({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const directionRef = useRef('down');

  // track scroll direction
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScrollDir = () => {
      const y = window.scrollY;
      directionRef.current = y > lastY ? 'down' : 'up';
      lastY = y;
    };
    window.addEventListener('scroll', handleScrollDir);
    return () => window.removeEventListener('scroll', handleScrollDir);
  }, []);

  // observe intersection and toggle visibility based on scroll direction
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dir = directionRef.current;
          if (entry.isIntersecting && dir === 'down') {
            setVisible(true);
          } else if (!entry.isIntersecting && dir === 'up') {
            setVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform duration-700 ease-out ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
