import React from 'react';
import nextworldWhite from '../assets/mainLogoWhite.png';
import heroBackgroundVideo from '../assets/main-page-nextworld-hero-background.mp4';
import whoAreWe from '../assets/who-are-we.jpg';
import EmailUsFooter from './EmailUs';
import FadeInOnScroll from './FadeInOnScroll.jsx';

const articles = [
  {
    "title": "More Than Just Music: The NEXT WORLD Community",
    "source": "Alyssa Cheung",
    "date": "April 2025",
    "description": "This is the story of NEXT WORLD Collective, a tight-knit group of young adults, who are redefining what it means to succeed in music without...",
    "link": "https://soundcloud.com/alyssa-cheung-104231867/msc-ind-144-narrated?si=3cd8f2ac899048908e0e50b129d759c3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
  },
  {
    "title": "Kai Caden and Brynne Are Bringing NEXT WORLD Everywhere",
    "source": "Bias Wrecker",
    "date": "May 2024",
    "description": "The collective’s mission is to empower and train artists. As a result, they’ve built one of the strongest artist-led communities in music...",
    "link": "https://www.thebiaswrecker.com/blog/kai-caden-and-brynne-are-bringing-next-world-everywhere"
  },
  {
    "title": "NEXTWORLD What's Next?",
    "source": "NYU Music Business Association",
    "date": "March 2024",
    "description": "Music collective “NEXTWORLD” is cultivating a safe space for Fil-Am and other Asian-American musicians in their local LA scene — but what does the future have in store for them?...",
    "link": "https://musba.co/nextworld-whats-next-vincent-felix/"
  },
  {
    "title": "brynne Is Championing the Next Generation of Artists",
    "source": "Bias Wrecker",
    "date": "February 2024",
    "description": "But what really changed for brynne is that he found a community of artists beginning with KU-KAI, another musician who shares an ambitious vision for music and collaboration...",
    "link": "https://www.thebiaswrecker.com/blog/brynne-is-championing-the-next-generation-of-artists"
  },
]


const MainPage = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen lg:screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            src={heroBackgroundVideo}
            playsInline
            autoPlay
            loop
            muted
            className="w-full h-screen object-cover"
          >
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col justify-center items-center lg:flex-row lg:items-center lg:justify-between max-w-6xl mx-auto h-full px-6">
          <div className="w-3/4 lg:mr-4 lg:pr-4">
            <img src={nextworldWhite} alt="Logo" className="object-contain" />
          </div>
          <div className="w-100 p-4 lg:p-0 lg:w-3/4 text-center lg:text-right text-white">
            <h1
              className="text-7xl lg:text-8xl text-center lg:text-right font-bold mb-4 racing-sans-one-regular fade-in delay-200"
            >
              Next World Collective
            </h1>
            <p
              className="mb-6 text-xl oswald-400 fade-in delay-400"
            >
              The best place to find your new favorite artist
            </p>
            <button
              onClick={() =>
                window.open(
                  'https://link.dice.fm/F6cb912c26af?dice_id=F6cb912c26af',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
              className="oswald-700 px-6 py-3 bg-purple-950 hover:bg-purple-800 text-white rounded-lg font-semibold transition"
            >
              Get Your Tickets Now!
            </button>
          </div>
        </div>
      </section>


      {/* Who Are We */}
      <section className="relative w-screen h-[90vh] lg:h-screen flex flex-col justify-center lg:flex-none overflow-hidden">
        {/* Background image */}
        <img
          src={whoAreWe}
          alt="Who Are We Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 flex flex-col justify-center lg:flex-row lg:items-center  lg:items-center lg:h-full">
          {/* Left column: title + blurb */}
          <FadeInOnScroll>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-6xl lg:text-9xl md:text-9xl font-bold text-white racing-sans-one-regular">
                Who Are We
              </h2>
              <p className="mt-4 text-4xl text-gray-300 oswald-400">
                We’re a group of
              </p>
            </div>
          </FadeInOnScroll>

          {/* Right column: pillars stacked vertically, pushed further right */}
          <div className="flex-1 mt-10 lg:mt-0 lg:ml-24 flex flex-col items-center lg:items-end space-y-6">
            {['Artists', 'Creatives', 'Visionaries',].map((label, i) => (
              <FadeInOnScroll key={label} delay={i * 200}>
                <div className="p-6 rounded-lg shadow-lg text-center">
                  <p className="text-5xl lg:text-6xl font-semibold text-white limelight-regular">
                    {label}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>







      {/* Articles Made About Us */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center racing-sans-one-regular mb-10">
            Articles About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.title} className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col">
                <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{article.source} • {article.date}</p>
                <p className="flex-1 oswald-400 mb-4">{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-blue-400 hover:underline"
                >
                  Read More
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      {/* <EmailUsFooter /> */}
    </div>
  );
};

export default MainPage;
