import React from 'react';
import nextworldWhite from '../assets/mainLogoWhite.png';
import heroBackgroundVideo from '../assets/main-page-nextworld-hero-background.mp4';
import EmailUsFooter from './EmailUs';

const articles = [
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
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            src={heroBackgroundVideo}
            autoPlay
            loop
            muted
            className="w-full h-screen object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex items-center justify-between max-w-6xl mx-auto h-full px-6">
          <div className="w-3/4 mr-4 pr-4">
            <img src={nextworldWhite} alt="Logo" className="object-contain" />
          </div>
          <div className="w-3/4 text-right text-white">
            <h1 className="text-8xl font-bold mb-4 racing-sans-one-regular">
              Next World Collective
            </h1>
            <p className="mb-6 text-xl oswald-400">
              The best place to find your new favorite artist
            </p>
          </div>
        </div>
      </section>

      {/* Who Are We */}
      <section className="py-20 bg-black">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-white racing-sans-one-regular">
            Who Are We
          </h2>

          {/* Blurb */}
          <p className="mt-4 text-lg text-gray-300 oswald-400">
            We’re a group of
          </p>

          {/* Three pillars */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {['Artists', 'Creators', 'Musicians'].map((label) => (
              <div key={label} className="p-6 bg-purple-950 rounded-lg shadow-lg">
                <p className="text-2xl font-semibold text-white">{label}</p>
              </div>
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
