import { useState } from 'react';
import aboutHero from '../../assets/aboutUsHero1.jpg';
import testHero from '../../assets/aboutUsHero4.jpg';
import Staff from '../../components/Staff';

//you are changing the direcotyr the images are for
const execMembers = [
  {
    id: 1,
    name: 'Kai Caden',
    role: 'CEO',
    photo: new URL('../../assets/meet-the-team/kai-tano.jpg', import.meta.url).href,
    desc: `Kai Caden is based within the San Fernando Valley and loves to  play saxophone, write music, and host concerts. He loves being a part of Next World because of its loving community and the support he receives for his music endeavors. He does his best to pay the community back by organizing Next World’s concert/mixer productions. `,
    funFact: ' I manage two artists currently cause I wanted to try it. No one told me that they can make fun of you for no reason. (thx Brynne & Harmony)'
  },
  {
    id: 2,
    name: 'Brynne Matuan',
    role: 'President',
    photo: new URL('../../assets/meet-the-team/brynne.jpg', import.meta.url).href,
    desc: `I’m based in Los Angeles, aside from being the president of Next World, I’m also an artist and singer-songwriter. Next World has been a place for me to grow with other musicians and artists, and I love the environment we’ve been able to foster. Next World was started as a friend group, and it makes me happy to see that it still feels like that friend group it originally was.`,
    funFact: 'My manager sucks. he keeps playing 2k instead of managing me.'
  },
  {
    id: 3,
    name: 'Alyssa Aquino',
    role: 'Vice President',
    photo: new URL('../../assets/meet-the-team/alyssa.jpg', import.meta.url).href,
    desc: `Heya everybody! I was born and raised from the SFV and I have been involved with Next World since its creation! I love working with Next World because not only do I get to work with creatives but I also get to support others career path. I have a number of hobbies but the most important of which has been fitness, baking, and music!`,
    funFact: 'I ran a marathon when I was 16 and hip thrusted 405 lbs at 20'
  },
  {
    id: 4,
    name: 'Ramzi Maducdoc',
    role: 'CFO',
    photo: new URL('../../assets/meet-the-team/ramzi.png', import.meta.url).href,
    desc: `Hey everyone! I’m Ramzi and I’m currently serving as the CFO for Next World. Being part of NextWorld, from concerts to casual gatherings, has deeply impacted my life, and I’m passionate about helping shape and sustain the vision that Kai and our team are building for this collective. I’m in awe of and constantly inspired by the creatives we work with on a regular basis. Honestly, I would do this even if I weren’t getting paid. (Which is convenient, because… I’m not. Kai??)`,
    funFact: 'I am a songwriter/rapper for a band called Melt to Stone, I help lead AV Studios alongside Kurt, and I work full-time at a major bank'
  },
  {
    id: 5,
    name: 'Allison Budianto',
    role: 'Content Executive',
    photo: new URL('../../assets/meet-the-team/allison.jpg', import.meta.url).href,
    desc: `I love video editing and unsurprisingly watching movies. (everything everywhere all at once <3)
Next World will always hold a space in my heart because every event has brought me so many memories. These people have introduced me to a world I never thought I’d be in and i’m learning more and more everyday I am around them. My experience in Next World has brought out a new side of me that I wish came out sooner.`,
    funFact: 'I peaked ascendant in valorant (nerd)'
  },
]

// Template:
// {
//   id: 0,
//   name: '',
//   role: '',
//   photo: new URL('../assets/meet-the-team/.png', import.meta.url).href,
//   desc: ``,
//   funFact: ''
// },

const teamMembers = [
  {
    id: 6,
    name: 'Kurt Buencamino',
    role: 'Human Resources and A&R',
    photo: new URL('../../assets/meet-the-team/kurt.png', import.meta.url).href,
    desc: `I am based in San Gabriel Valley and I love, songwriting, playing drum set ,music production, and writing synopsis for short films. Aside from creativity, Next World is a place where I can improve the lives of others. I believe that every person is capable of being good. Especially when they choose to listen and are in the right environment.`,
    funFact: 'I also run my own creative community called AV Studios Group Entertainment.'
  },
  {
    id: 7,
    name: 'Harmony Calata',
    role: 'Event Coordinator',
    photo: new URL('../../assets/meet-the-team/harmony.jpg', import.meta.url).href,
    desc: `Harmony is based in Inland Empire and enjoys playing guitar, reading, and writing songs for people she loves. Her favorite part about being involved in Next World is its collaborative environment and the authenticity of everyone she works with.`,
    funFact: 'She is NOT in HR:)'
  },
  {
    id: 10,
    name: 'Alyssa Cheung',
    role: 'Content Executive',
    photo: new URL('../../assets/meet-the-team/alyssac.jpg', import.meta.url).href,
    desc: `Hi! My name is Alyssa and I’m from Hong Kong. I’m one of the vocalists in my band Melt To Stone, and I’m also working on writing my solo music. Being in Next World not only opened up music opportunities for me, but it also allowed me to meet the most genuine people that I consider my loved ones. Next World feels like a second home, even when I’m far away from where I’m from.`,
    funFact: 'I’m a Communication Major at UCLA with a Music Industry Minor, and I’ll be graduating in a month!'
  },
  {
    id: 8,
    name: 'Michael Dy',
    role: 'Event Coordinator',
    photo: new URL('../../assets/meet-the-team/michael.jpg', import.meta.url).href,
    desc: `Based in the Inland Empire, Michael plays an integral role in planning and coordinating Next World events, as well as playing drums and bass guitar for various Next World artists. He loves working in Next World because of how much they thrive on hard work, dedication, and community. Outside of music, Michael loves weightlifting and hiking.`,
    funFact: 'I was a math major at UC Riverside'
  },
  {
    id: 16,
    name: 'Danielle K Gulmatico',
    role: 'Creative Director & Media Team',
    photo: new URL('../../assets/meet-the-team/danielle.png', import.meta.url).href,
    desc: `Hello! I'm based in the Los Angeles area, and I primarily focus on film production and writing. But I also have interests in guitar, ceramics, and reading. I love working with Next World to connect artists through music and media, because music has the power to connect people through the human condition.`,
    funFact: 'Danielle loves making coffee at home and working on her latte art'
  },
  {
    id: 19,
    name: 'Ellie Kitagawa',
    role: 'Photographer/Videographer',
    photo: new URL('../../assets/meet-the-team/ellie.png', import.meta.url).href,
    desc: `Based in Orange County, California, Ellie is a photographer/videographer who collaborates with various multimedia artists. She enjoys hiking, swimming, and rock-climbing. (She's climbed a V8) She enjoys being involved with Next World because of its welcoming community and the variety of artists she collaborates with.`,
    funFact: 'She currently has 260 tabs, GTA, and CS:GO open on her computer'
  },
  {
    id: 14,
    name: 'LoganFong',
    role: 'Event Manager',
    photo: new URL('../../assets/meet-the-team/logan.jpg', import.meta.url).href,
    desc: `Based in Los Angeles, LoganFong is a hospitality management student and film photographer working with 35mm and exploring 120mm formats. With a growing interest in event management and production, they aim to combine their visual work with hands-on experience in organizing creative events within the music and arts space.`,
    funFact: 'He is an avid tea fanatic'
  },
  {
    id: 11,
    name: 'Nyssa Mae',
    role: 'Artist and Repertoire',
    photo: new URL('../../assets/meet-the-team/nyssa.jpg', import.meta.url).href,
    desc: `Nyssa Mae Laspiñas is a singer and songwriter based in North East LA (Glendale/Eagle Rock Area).
She is most known for her hospitality and keeping it real with others. She enjoys meeting new people, bonding, and creating relationships/friendships along the way! While supporting the artists of Next World, Nyssa is truly eager to witness this community’s growth, talent and love that Next World brings. She guides artists and friends to the Next World community. Brings others to the events is her goal but more importantly, always making sure we are all having a great time!`,
    funFact: 'She helps run another organization called AV Studio Group Entertainment'
  },
  {
    id: 15,
    name: 'Amauri McPherson',
    role: 'Photographer/Videographer',
    photo: new URL('../../assets/meet-the-team/amauri.jpg', import.meta.url).href,
    desc: `Yo! My name is Amauri and I’m based in Culver City/West LA. I like going on walks, video games (on occasion) and making art! I love working with NE cuz I get to meet fellow creatives from all walks of life. I even meet some that are much better than me, which makes me want to get better! This community is one of a kind and I’m honored that I get to document its progress and success.`,
    funFact: 'Amauri is double jointed in both his shoulders'
  },
  {
    id: 13,
    name: 'Mario Notarangelo',
    role: 'Musical Director/Performer',
    photo: new URL('../../assets/meet-the-team/mario.png', import.meta.url).href,
    desc: `Mario Notarangelo is a performer, composer, arranger, conductor, musical director, songwriter, producer, and multi-instrumentalist from the Inland Empire. He spent years studying music on his own before his academic pursuits led him to study music at RCC and USC. He is passionate about live music and helping artists realize their vision, whether it be contributing to their live arrangements, recording in the studio, or, most frequently, picking up a guitar and getting onstage. His musical influences are as diverse as his skillset, and he loves to take on new and exciting projects!`,
    funFact: 'Forza Juve, Forza Gigi 🤍🖤'
  },
  {
    id: 12,
    name: 'Lexi Ortiz-Luis',
    role: 'Event Coordinator',
    photo: new URL('../../assets/meet-the-team/lexi.jpg', import.meta.url).href,
    desc: `Alexis “Lexi” Ortiz-Luis is a singer and songwriter based in Los Angeles County. Being part of Next World has brought her into a vibrant, loving community of talented creatives—each with their own spark and quirks. It’s a space where she’s been able to grow not just behind the scenes at live events, but also into the artist she’s always dreamed of becoming. To Lexi, Next World isn’t just a collective—it’s family.`,
    funFact: 'She’s got perfect pitch, a knack for Rubik’s cubes and puzzles, studies Occupational Therapy at USC with a creative twist—minoring in Songwriting and Music Industry—and leads the new and still in construction band, Set Your Heart Ablaze with fire and soul.'
  },
  {
    id: 9,
    name: 'Owen A Santos',
    role: 'Next World Host',
    photo: new URL('../../assets/meet-the-team/owen.jpg', import.meta.url).href,
    desc: `Hi everyone! I grew up in the Pasadena area and, I’ve been so grateful to see my passions come to life through nxtwrld. Whether I’m on stage or in front of a camera, I love connecting with people and being part of something creative. The community I’ve found here is full of support, talent, and genuine connection. I’m so excited to keep growing alongside everyone and help spotlight the amazing artists coming up. See you guys in the crowd!`,
    funFact: `Jollibee order 🐝 2pc chicken joy w/ jolly spaghetti & pineapple quencher (1 spicy 1 og)`
  },
  {
    id: 17,
    name: 'David Willner',
    role: 'Audio Engineer',
    photo: new URL('../../assets/meet-the-team/david.jpg', import.meta.url).href,
    desc: `David Willner is based in Pasadena, where he wears many hats within the Nxtworld community—everything from wrapping cables to recording and producing live sessions. A true jack-of-all-trades, he plays trumpet, guitar, and Pro Tools, and can be found sweating over a mixer at any hour of the day or night.
For David, there’s nothing more fulfilling—or exhilarating—than putting on a great live show… well, except maybe sending artists a fun little mixtape of their performance afterward.`,
    funFact: 'When he’s not cooking up beats in the living room, he’s likely in the kitchen whipping up amazing dinners for his girlfriend, Aisa.'
  },
  {
    id: 18,
    name: 'Mica Yui',
    role: 'East General Manager',
    photo: new URL('../../assets/meet-the-team/mica.jpg', import.meta.url).href,
    desc: `Based in Orlando, Florida, Mica is a Filipino American artist, known as FILIPINO EXTRADONAIRE, who plays a pivotal part in Next World's East Branch of Artists and Musicians. He enjoys playing Fortnite, doom-scrolling, and producing for his friends. Mica loves working for Next World because of the supportive community that he is involved in, as well as the vision for future artists that both Next World and Mica share.`,
    funFact: 'Mica Yui was supposed to be a NASCAR driver.'
  },
];

export default function AdminAboutUs() {
  const [selectedMember, setSelectedMember] = useState(null);
  return (
    <>
      <div className="bg-black">
        {/* About Us Hero */}
        <section
          className="relative w-screen h-screen bg-cover lg:bg-fixed lg:bg-fill"
          style={{ backgroundImage: `url(${aboutHero})` }}
        >
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4">
            <h1 className="text-7xl lg:text-9xl font-bold text-white racing-sans-one-regular fade-in delay-200">
              About Us
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 bebas-kai-regular max-w-2xl fade-in delay-400 add-shadow">
              Next World Collective is a LA-based creative community born from a simple desire: “friendship through music.” We provide hands-on mentorship and a space to experiment, whether it’s through recording sessions, songwriting, production, jam nights, community events, or full-scale concert showcases. With members spread across the country and beyond, from musicians to graphic designers, our community thrives on genuine connection, curiosity, and shared creative energy. There’s no formal way to join—if we vibe, we create. Together, we’re shaping the next world of music.          </p>
          </div>
        </section>

        {/* Our Mission Hero */}
        <section
          className="relative w-screen h-[101vh] bg-cover bg-center lg:bg-fixed lg:bg-center lg:bg-cover"
          style={{ backgroundImage: `url(${testHero})` }}
        >
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-7xl lg:text-8xl font-semibold text-white racing-sans-one-regular fade-in delay-200">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed oswald-400 text-xl lg:text-2xl fade-in delay-400 add-shadow">
              "Next World Collective is a platform for unheard voices."
              We exist to spotlight emerging artists who are often overlooked despite their talent and dedication. Our mission is to connect these creators with audiences who love to discover new music. Through authentic support, collaborative spaces, and powerful live experiences, we help eager creatives take the next step in their careers, especially when no one else will.
            </p>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="space-y-8 max-w-screen-xl mx-auto px-4 py-10">
          <h2 className="text-5xl font-semibold text-center text-white racing-sans-one-regular">
            Meet the Team
          </h2>
          <h3 className="text-2xl font-semibold text-left text-white oswald-400">
            Executive Team
          </h3>
          <Staff teamMembers={execMembers} />
          <h3 className="text-2xl font-semibold text-left text-white oswald-400">
            Major Contributors
          </h3>
          <Staff teamMembers={teamMembers} />

        </section>

        {/* Modal Popup */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setSelectedMember(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Modal Content */}
            <div
              className="relative bg-gray-900 rounded-lg p-8 max-w-2xl w-full mx-4 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo on the left */}
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                className="w-48 h-48 object-cover rounded-lg flex-shrink-0"
              />

              {/* Description on the right */}
              <div className="text-white flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedMember.name}
                    </h3>
                    <p className="text-gray-400">{selectedMember.role}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-500 hover:text-gray-300 text-2xl leading-none"
                  >
                    &times;
                  </button>
                </div>
                <div className="mt-4 prose prose-invert text-gray-300">
                  <p>
                    {selectedMember.desc}
                  </p>
                  <p>
                    <strong>Fun Fact:</strong> {selectedMember.funFact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}