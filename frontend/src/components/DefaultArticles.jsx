import Articles from "./Articles";

const defaultArticles = [
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
  ];

export default function(){
    return <Articles articles={defaultArticles}/>
}