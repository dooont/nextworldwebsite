import React, { useState } from 'react';
import heroBackgroundVideo from '../assets/events-nextworld-hero-background.mp4';

// Template
//     id: 0,
//     image: new URL('../assets/nextworld-mic-white.png', import.meta.url).href,
//     title: '',
//     subtitle: 'Month Day, Year',
//     url: '',
const defaultUpcomingEvents = [
  {
    id: 12,
    image: new URL('../assets/nextworld-mic-white.png', import.meta.url).href,
    title: 'CraftxNXTWORLD v.5',
    subtitle: 'July 19, 2025',
    url: 'https://maps.app.goo.gl/JnGgcdHYgdKdjVMX8',
  },
  {
    id: 0,
    image: new URL('../assets/nextworld-mic-white.png', import.meta.url).href,
    title: 'More to be Announced!',
    subtitle: 'Dates TBA',
    url: 'https://www.instagram.com/nxtworldco/',
  },
];

// Template (subtitle = date)
//   {
//     id: 0,
//     image: new URL('../public/assets/.png', import.meta.url).href,
//     title: ',
//     subtitle: '',
//     desc: ``,
//     artists: [],
//     artistContact: [],
//     place: ''
//   },

const dummyEvents = [
  {
    id: 11,
    image: new URL('../public/assets/11.jpg', import.meta.url).href,
    title: 'Next World Showcase @ The Paramount v.2',
    subtitle: 'June 29, 2025',
    // url: 'https://link.dice.fm/F6cb912c26af?dice_id=F6cb912c26af',
    desc: ``,
    artists: [
      "Kimmy Pidazo",
      "brynne",
      "Keoni Usi",
      "Labit",
    ],
    artistContact: [],
    place: ''
  },
  {
    id: 10,
    image: new URL('../public/assets/10.png', import.meta.url).href,
    title: 'CraftxNXTWORLD v.4',
    subtitle: 'April 12, 2025',
    desc: ``,
    artists: [
      "brynne",
      "Zac Pana",
      "Aleyna Moon",
      "Labit",
      "Eyen Paredes"
    ],
    artistContact: [
      "paper.crannes",
      "zacpanaa",
      "m00n.wav",
      "labitlabit",
      "eyenparedes"
    ],
    place: ''
  },
  {
    id: 9,
    image: new URL('../public/assets/9.jpg', import.meta.url).href,
    title: 'CraftxNXTWORLD v.3',
    subtitle: 'October 19, 2024',
    desc: ``,
    artists: [
      "American Woman",
      "Melt To Stone",
      "A.N.T.E",
      "Kiara Skyler",
      "Keoni Usi",
      "Nilo Ilo"
    ],
    artistContact: [
      "americanwoman_band",
      "melttostone.music",
      "anteofficial",
      "kiaskyler",
      "keoni_usi",
      "nilo.ilo"
    ],
    place: ''
  },
  {
    id: 8,
    image: new URL('../public/assets/8.jpg', import.meta.url).href,
    title: 'Next World Exclusive @ Pauhaus',
    subtitle: 'September 7, 2024',
    desc: ``,
    artists: [
      "Kiara Skyler",
      "brynne",
      "Meghan Chen",
      "Valerie",
      "Aleyna Moon",
      "Lodea",
      "American Woman"
    ],
    artistContact: [
      "kiaskyler",
      "paper.crannes",
      "meghanxchen",
      "gui7ar_val",
      "m00n.wav",
      "lodeamusic",
      "americanwoman_band"
    ],
    place: ''
  },
  {
    id: 7,
    image: new URL('../public/assets/7.jpg', import.meta.url).href,
    title: 'CraftxNXTWORLD v.2',
    subtitle: 'July 20, 2024',
    desc: ``,
    artists: [
      "kinn",
      "brynne",
      "Aleyna Moon",
      "Yohanna Milena"
    ],
    artistContact: [
      "99ki.nn",
      "paper.crannes",
      "m00n.wav",
      "yohanna.milena"
    ],
    place: ''
  },
  {
    id: 6,
    image: new URL('../public/assets/6.jpg', import.meta.url).href,
    title: 'Next World Showcase @ The Paramount',
    subtitle: 'June 23, 2024',
    desc: `Next World celebrated its inaugural concert at the iconic venue, The Paramount. This event marked a six-month journey for the community, united in achieving this long-awaited dream. The concert drew a crowd of over 150 people, all enjoying the music that embodies Next World’s vision. The quality of the event piqued the interest of many within the music community, including artists, producers, and college students, who resonated with Next World’s brand and message. For us, this event signifies a milestone, reflecting on our previous concerts and realizing the legitimacy of our current endeavors. Moving forward, Next World Collective remains committed to providing a platform for artists to reach new heights, fostering a communal environment where collaboration thrives and collective success is celebrated.`,
    artists: [
      "brynne",
      "mica yui",
      "Aleyna Moon",
      "Hohyun",
    ],
    artistContact: [
      "paper.crannes",
      "mica_yui",
      "m00n.wav",
      "itshohyun"],
    place: 'Boyle Heights, CA'
  },
  {
    id: 5,
    image: new URL('../public/assets/5.jpg', import.meta.url).href,
    title: 'CraftxNXTWORLD v.1',
    subtitle: 'February 23, 2024',
    desc: ``,
    artists: [
      "brynne",
      "Valerie",
      "Aleyna Moon"
    ],
    artistContact: [
      "paper.crannes",
      "gui7ar_val",
      "m00n_wav"
    ],
    place: ''
  },
  {
    id: 4,
    image: new URL('../public/assets/4.jpg', import.meta.url).href,
    title: 'Fall Into The Next World',
    subtitle: 'October 14, 2023',
    desc: `As we pressed for another concert in North Hollywood, just four days before the scheduled date, the venue informed us that they were unable to host our event due to unforeseen circumstances on their property. This caused a stir within the community as our staff, artists, and musicians scrambled to secure an alternative venue before the concert date. The stress was doubled by artists flying in and the concert's cancellation due to the lack of a venue. Fortunately, Next World secured a larger venue with better amenities just two days before the event. As the concert kicked off, we experienced a significant turnout, with 100+ attendees and some traveling from various parts of Southern California to enjoy our music. Throughout the event, Next World offered a variety of vendors selling accessories and drinks, including a boba shop that crafted its very own Next World drink. Many attendees remarked that this was our best concert to date, a sentiment that spread throughout the NextWorld community. Despite the initial strain, there was an overwhelming sense of relief and joy among us all after the successful show. `,
    artists: [
      "OCEAN",
      "Picassio",
      "Valerie",
      "Owen Aguilar",
      "Aleyna Moon",
      "Melt To Stone"
    ],
    artistContact: [
      "oceansoul.11",
      "r.picassio",
      "gui7ar.val_",
      "owenaguilarr",
      "m00n.wav",
      "melttostone.music"
    ],
    place: 'Northridge, CA'
  },
  {
    id: 3,
    image: new URL('../public/assets/3.jpg', import.meta.url).href,
    title: 'Next World Spring Exclusive',
    subtitle: 'April 29, 2023',
    desc: `Spring break was approaching, sparking the idea for a special event. Next World Collective organized a spring exclusive for people to enjoy during their break. Once again, Next World brought in independent artists from places like Canada, Denver, and New York, aiming to expose LA audiences to a variety of music from different regions. Following this concert, the community felt it was time for Next World to take the next step in creating larger events. With that in mind, we set out to produce our biggest concert yet in the fall.`,
    artists: [
      "Owen Aguilar",
      "Stvphn",
      "Erin Pierson",
      "Vousyou",
      "Melt To Stone"
    ],
    artistContact: [
      "owenaguilarr",
      "stvphn.wav",
      "erinkpierson",
      "vousyou_",
      "melttostone.music"
    ],
    place: 'North Hollywood, CA'
  },
  {
    id: 2,
    image: new URL('../public/assets/2.jpg', import.meta.url).href,
    title: 'Next World Winter Exclusive',
    subtitle: 'January 14, 2023',
    desc: `    As the new year began, Next World Collective showcased more artists at a new event in North Hollywood. The community was prepared for all aspects of the concert, except for the heavy downpour in the area. The venue included an outdoor section that attendees first passed through upon arrival. Due to the rain, Next World had to set up multiple canopies for the audience. This also caused tension behind the scenes as the artists and bands had to soundcheck inside while managing the puddles forming within the venue. Despite the initial chaos, Next World successfully pulled off their second showcase under harsh conditions. For the community, this was a wake-up call about the potential challenges concerts could face, but we were excited to plan the next show.`,
    artists: [
      "Kai Caden",
      "Christabelle Marbun",
      "Nicole Kyra",
      "Hohyun",
      "Melt To Stone",
    ],
    artistContact: [
      "kaicaden",
      "christabellemarbun",
      "nicolekyra_",
      "itshohyun",
      "melttostone.music"
    ],
    place: 'North Hollywood, CA'
  },
  {
    id: 1,
    image: new URL('../public/assets/1.jpg', import.meta.url).href,
    title: 'NextWorld Collective',
    subtitle: 'November 12, 2022',
    desc: `Next World Collective made its public debut at Kusina Filipina in Eagle Rock. This marked their first venture into organizing a concert.  Despite the novelty of the experience, attendees appreciated the diverse performances that evening and enjoyed the restaurant's hospitality and service. The event celebrated independent artistry, allowing them to share their craft with an enthusiastic audience eager to discover new music. After the concert, many community members admired the vision behind these showcases. They hinted at the potential growth of this music community if more productions were pursued. Next World Collective chose to present more showcases to the public and began planning the next show.`,
    artists: [
      "mj apanay",
      "Koapaka",
      "kinn",
      "brynne",
      "EllaRae",
      "Jxmes",
      "Jaimar",
      "James Casabar",
      "Binnitus",
      "Addie Chandler"
    ],
    artistContact: [
      "mjapanay",
      "koapakaaki",
      "99ki.nn",
      "paper.crannes",
      "ellarae19",
      "justjaimar",
      "jamesviray",
      "jamescasabarrr",
      "binnitusbanter",
      "addiethatsmath"
    ],
    place: 'Eagle Rock, CA'
  },
];






export default function EventsMedia({ events = dummyEvents, upcomingEvents = defaultUpcomingEvents }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr mb-8">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => window.open(event.url, '_blank')}
              className="group bg-purple-950 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-40 w-full overflow-hidden bg-[#4b0082]">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#4b0082] bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-xl font-semibold text-white bebas-kai-regular">
                  {event.title}
                </h3>
                <p className="text-gray-200 text-sm oswald-400">
                  {event.subtitle}
                </p>
              </div>
            </div>
          ))}

        </div>

        <h2 className="text-5xl text-white font-bold mb-6 racing-sans-one-regular">
          Past Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="group bg-purple-950 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-40 w-full overflow-hidden bg-[#4b0082]">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#4b0082] bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-xl font-semibold text-white bebas-kai-regular">
                  {event.title}
                </h3>
                <p className="text-gray-200 text-sm oswald-400">
                  {event.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
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
            <p className="text-gray-600 mb-4 bebas-kai-regular">{selectedEvent.subtitle}</p>
            {selectedEvent.desc && (
              <p className="text-gray-800 mb-4 oswald-400">{selectedEvent.desc}</p>
            )}
            {selectedEvent.place && (
              <p className="text-gray-700 italic mb-4 bebas-kai-regular">Location: {selectedEvent.place}</p>
            )}
            {selectedEvent.artistContact.length > 0 && (
              <>
                <h4 className="text-lg font-semibold mb-2 racing-sans-one-regular">Artists</h4>
                <ul className="list-disc list-inside mb-4 oswald-400">
                  {selectedEvent.artists.map((artist, idx) => {
                    const handle = selectedEvent.artistContact[idx];
                    return (
                      <li key={handle}>
                        <a
                          href={`https://www.instagram.com/${handle}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-800 hover:underline"
                        >
                          {artist}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
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
    </div>
  );
}
