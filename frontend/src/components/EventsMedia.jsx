import heroBackgroundVideo from '../assets/events-nextworld-hero-background.mp4';
import UpcomingEventsContainer from './UpcomingEventsContainer.jsx';
import PastEventsContainer from './PastEventsContainer.jsx';






export default function EventsMedia() {
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

      <section className="max-w-6xl mx-auto px-4">
        <UpcomingEventsContainer />

        <PastEventsContainer />
      </section>
    </div>
  );
}
