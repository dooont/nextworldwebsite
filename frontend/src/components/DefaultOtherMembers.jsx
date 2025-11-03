import Staff from './Staff';

const defaultOtherMembers = [
    {
      id: 6,
      firstName: 'Kurt',
      lastName: 'Buencamino',
      role: 'Human Resources and A&R',
      photoUrl: '/assets/meet-the-team/kurt.png',
      desc: `I am based in San Gabriel Valley and I love, songwriting, playing drum set ,music production, and writing synopsis for short films. Aside from creativity, Next World is a place where I can improve the lives of others. I believe that every person is capable of being good. Especially when they choose to listen and are in the right environment.`,
      funFact: 'I also run my own creative community called AV Studios Group Entertainment.'
    },
    {
      id: 7,
      firstName: 'Harmony',
      lastName: 'Calata',
      role: 'Event Coordinator',
      photoUrl: '/assets/meet-the-team/harmony.jpg',
      desc: `Harmony is based in Inland Empire and enjoys playing guitar, reading, and writing songs for people she loves. Her favorite part about being involved in Next World is its collaborative environment and the authenticity of everyone she works with.`,
      funFact: 'She is NOT in HR:)'
    },
    {
      id: 10,
      firstName: 'Alyssa',
      lastName: 'Cheung',
      role: 'Content Executive',
      photoUrl: '/assets/meet-the-team/alyssac.jpg',
      desc: `Hi! My name is Alyssa and I’m from Hong Kong. I’m one of the vocalists in my band Melt To Stone, and I’m also working on writing my solo music. Being in Next World not only opened up music opportunities for me, but it also allowed me to meet the most genuine people that I consider my loved ones. Next World feels like a second home, even when I’m far away from where I’m from.`,
      funFact: 'I’m a Communication Major at UCLA with a Music Industry Minor, and I’ll be graduating in a month!'
    },
    {
      id: 8,
      firstName: 'Michael',
      lastName: 'Dy',
      role: 'Event Coordinator',
      photoUrl: '/assets/meet-the-team/michael.jpg',
      desc: `Based in the Inland Empire, Michael plays an integral role in planning and coordinating Next World events, as well as playing drums and bass guitar for various Next World artists. He loves working in Next World because of how much they thrive on hard work, dedication, and community. Outside of music, Michael loves weightlifting and hiking.`,
      funFact: 'I was a math major at UC Riverside'
    },
    {
      id: 16,
      firstName: 'Danielle K',
      lastName: 'Gulmatico',
      role: 'Creative Director & Media Team',
      photoUrl: '/assets/meet-the-team/danielle.png',
      desc: `Hello! I'm based in the Los Angeles area, and I primarily focus on film production and writing. But I also have interests in guitar, ceramics, and reading. I love working with Next World to connect artists through music and media, because music has the power to connect people through the human condition.`,
      funFact: 'Danielle loves making coffee at home and working on her latte art'
    },
    {
      id: 19,
      firstName: 'Ellie',
      lastName: 'Kitagawa',
      role: 'Photographer/Videographer',
      photoUrl: '/assets/meet-the-team/ellie.png',
      desc: `Based in Orange County, California, Ellie is a photographer/videographer who collaborates with various multimedia artists. She enjoys hiking, swimming, and rock-climbing. (She's climbed a V8) She enjoys being involved with Next World because of its welcoming community and the variety of artists she collaborates with.`,
      funFact: 'She currently has 260 tabs, GTA, and CS:GO open on her computer'
    },
    {
      id: 14,
      firstName: 'Logan',
      lastName: 'Fong',
      role: 'Event Manager',
      photoUrl: '/assets/meet-the-team/logan.jpg',
      desc: `Based in Los Angeles, LoganFong is a hospitality management student and film photographer working with 35mm and exploring 120mm formats. With a growing interest in event management and production, they aim to combine their visual work with hands-on experience in organizing creative events within the music and arts space.`,
      funFact: 'He is an avid tea fanatic'
    },
    {
      id: 11,
      firstName: 'Nyssa',
      lastName: 'Mae',
      role: 'Artist and Repertoire',
      photoUrl: '/assets/meet-the-team/nyssa.jpg',
      desc: `Nyssa Mae Laspiñas is a singer and songwriter based in North East LA (Glendale/Eagle Rock Area).
  She is most known for her hospitality and keeping it real with others. She enjoys meeting new people, bonding, and creating relationships/friendships along the way! While supporting the artists of Next World, Nyssa is truly eager to witness this community’s growth, talent and love that Next World brings. She guides artists and friends to the Next World community. Brings others to the events is her goal but more importantly, always making sure we are all having a great time!`,
      funFact: 'She helps run another organization called AV Studio Group Entertainment'
    },
    {
      id: 15,
      firstName: 'Amauri',
      lastName: 'McPherson',
      role: 'Photographer/Videographer',
      photoUrl: '/assets/meet-the-team/amauri.jpg',
      desc: `Yo! My name is Amauri and I’m based in Culver City/West LA. I like going on walks, video games (on occasion) and making art! I love working with NE cuz I get to meet fellow creatives from all walks of life. I even meet some that are much better than me, which makes me want to get better! This community is one of a kind and I’m honored that I get to document its progress and success.`,
      funFact: 'Amauri is double jointed in both his shoulders'
    },
    {
      id: 13,
      firstName: 'Mario',
      lastName: 'Notarangelo',
      role: 'Musical Director/Performer',
      photoUrl: '/assets/meet-the-team/mario.png',
      desc: `Mario Notarangelo is a performer, composer, arranger, conductor, musical director, songwriter, producer, and multi-instrumentalist from the Inland Empire. He spent years studying music on his own before his academic pursuits led him to study music at RCC and USC. He is passionate about live music and helping artists realize their vision, whether it be contributing to their live arrangements, recording in the studio, or, most frequently, picking up a guitar and getting onstage. His musical influences are as diverse as his skillset, and he loves to take on new and exciting projects!`,
      funFact: 'Forza Juve, Forza Gigi 🤍🖤'
    },
    {
      id: 12,
      firstName: 'Lexi',
      lastName: 'Ortiz-Luis',
      role: 'Event Coordinator',
      photoUrl: '/assets/meet-the-team/lexi.jpg',
      desc: `Alexis “Lexi” Ortiz-Luis is a singer and songwriter based in Los Angeles County. Being part of Next World has brought her into a vibrant, loving community of talented creatives—each with their own spark and quirks. It’s a space where she’s been able to grow not just behind the scenes at live events, but also into the artist she’s always dreamed of becoming. To Lexi, Next World isn’t just a collective—it’s family.`,
      funFact: 'She’s got perfect pitch, a knack for Rubik’s cubes and puzzles, studies Occupational Therapy at USC with a creative twist—minoring in Songwriting and Music Industry—and leads the new and still in construction band, Set Your Heart Ablaze with fire and soul.'
    },
    {
      id: 9,
      firstName: 'Owen A',
      lastName: 'Santos',
      role: 'Next World Host',
      photoUrl: '/assets/meet-the-team/owen.jpg',
      desc: `Hi everyone! I grew up in the Pasadena area and, I’ve been so grateful to see my passions come to life through nxtwrld. Whether I’m on stage or in front of a camera, I love connecting with people and being part of something creative. The community I’ve found here is full of support, talent, and genuine connection. I’m so excited to keep growing alongside everyone and help spotlight the amazing artists coming up. See you guys in the crowd!`,
      funFact: `Jollibee order 🐝 2pc chicken joy w/ jolly spaghetti & pineapple quencher (1 spicy 1 og)`
    },
    {
      id: 17,
      firstName: 'David',
      lastName: 'Willner',
      role: 'Audio Engineer',
      photoUrl: '/assets/meet-the-team/david.jpg',
      desc: `David Willner is based in Pasadena, where he wears many hats within the Nxtworld community—everything from wrapping cables to recording and producing live sessions. A true jack-of-all-trades, he plays trumpet, guitar, and Pro Tools, and can be found sweating over a mixer at any hour of the day or night.
  For David, there’s nothing more fulfilling—or exhilarating—than putting on a great live show… well, except maybe sending artists a fun little mixtape of their performance afterward.`,
      funFact: 'When he’s not cooking up beats in the living room, he’s likely in the kitchen whipping up amazing dinners for his girlfriend, Aisa.'
    },
    {
      id: 18,
      firstName: 'Mica',
      lastName: 'Yui',
      role: 'East General Manager',
      photoUrl: '/assets/meet-the-team/mica.jpg',
      desc: `Based in Orlando, Florida, Mica is a Filipino American artist, known as FILIPINO EXTRADONAIRE, who plays a pivotal part in Next World's East Branch of Artists and Musicians. He enjoys playing Fortnite, doom-scrolling, and producing for his friends. Mica loves working for Next World because of the supportive community that he is involved in, as well as the vision for future artists that both Next World and Mica share.`,
      funFact: 'Mica Yui was supposed to be a NASCAR driver.'
    },
  ];

export default function DefaultOtherMembers(){
    return <Staff teamMembers={defaultOtherMembers}/>
}