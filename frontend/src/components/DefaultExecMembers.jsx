import Staff from "./Staff";

const defaultExecMembers = [
    {
      id: 1,
      firstName: 'Kai',
      lastName: 'Caden',
      role: 'CEO',
      photoUrl: '/assets/meet-the-team/kai-tano.jpg',
      desc: `Kai Caden is based within the San Fernando Valley and loves to play saxophone, write music, and host concerts. He loves being a part of Next World because of its loving community and the support he receives for his music endeavors. He does his best to pay the community back by organizing Next World’s concert/mixer productions. `,
      funFact: 'I manage two artists currently cause I wanted to try it. No one told me that they can make fun of you for no reason. (thx Brynne & Harmony)'
    },
    {
      id: 2,
      firstName: 'Brynne',
      lastName: 'Matuan',
      role: 'President',
      photoUrl: '/assets/meet-the-team/brynne.jpg',
      desc: `I’m based in Los Angeles, aside from being the president of Next World, I’m also an artist and singer-songwriter. Next World has been a place for me to grow with other musicians and artists, and I love the environment we’ve been able to foster. Next World was started as a friend group, and it makes me happy to see that it still feels like that friend group it originally was.`,
      funFact: 'My manager sucks. he keeps playing 2k instead of managing me.'
    },
    {
      id: 3,
      firstName: 'Alyssa',
      lastName: 'Aquino',
      role: 'Vice President',
      photoUrl: '/assets/meet-the-team/alyssa.jpg',
      desc: `Heya everybody! I was born and raised from the SFV and I have been involved with Next World since its creation! I love working with Next World because not only do I get to work with creatives but I also get to support others career path. I have a number of hobbies but the most important of which has been fitness, baking, and music!`,
      funFact: 'I ran a marathon when I was 16 and hip thrusted 405 lbs at 20'
    },
    {
      id: 4,
      firstName: 'Ramzi',
      lastName: 'Maducdoc',
      role: 'CFO',
      photoUrl: '/assets/meet-the-team/ramzi.png',
      desc: `Hey everyone! I’m Ramzi and I’m currently serving as the CFO for Next World. Being part of NextWorld, from concerts to casual gatherings, has deeply impacted my life, and I’m passionate about helping shape and sustain the vision that Kai and our team are building for this collective. I’m in awe of and constantly inspired by the creatives we work with on a regular basis. Honestly, I would do this even if I weren’t getting paid. (Which is convenient, because… I’m not. Kai??)`,
      funFact: 'I am a songwriter/rapper for a band called Melt to Stone, I help lead AV Studios alongside Kurt, and I work full-time at a major bank'
    },
    {
      id: 5,
      firstName: 'Allison',
      lastName: 'Budianto',
      role: 'Content Executive',
      photoUrl: '/assets/meet-the-team/allison.jpg',
      desc: `I love video editing and unsurprisingly watching movies. (everything everywhere all at once <3)
  Next World will always hold a space in my heart because every event has brought me so many memories. These people have introduced me to a world I never thought I’d be in and i’m learning more and more everyday I am around them. My experience in Next World has brought out a new side of me that I wish came out sooner.`,
      funFact: 'I peaked ascendant in valorant (nerd)'
    },
  ]

export default function DefaultExecMembers(){
    return <Staff teamMembers={defaultExecMembers} />
}