import React, { useState, useEffect } from 'react';
import aboutHero from '../assets/aboutUsHero1.jpg';
import missionHero from '../assets/aboutUsHero2.jpg';
import testHero from '../assets/aboutUsHero4.jpg';
import Staff from './Staff';
import DefaultExecMembers from './DefaultExecMembers';
import DefaultOtherMembers from './DefaultOtherMembers';
import axios from 'axios';
import background1 from '../assets/background1.jpg';
import background2 from '../assets/background2.jpg'


export default function AboutUsComponent() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [executiveMembers, setExecutiveMembers] = useState([]);
  const [otherMembers, setOtherMembers] = useState([]);
  const [loadingExec, setLoadingExec] = useState(true);
  const [loadingOther, setLoadingOther] = useState(true);
  const [errorExec, setErrorExec] = useState(false);
  const [errorOther, setErrorOther] = useState(false);

  useEffect(() => {
    async function fetchExecutiveMembers() {
      setLoadingExec(true);
      setErrorExec(false);
      try {
        const response = await axios.get('http://localhost:3000/members/executive');
        setExecutiveMembers(response.data.members);
      } catch (e) {
        setErrorExec(true);
      } finally {
        setLoadingExec(false);
      }
    }

    async function fetchOtherMembers() {
      setLoadingOther(true);
      setErrorOther(false);
      try {
        const response = await axios.get('http://localhost:3000/members/other');
        setOtherMembers(response.data.members);
      } catch (e) {
        setErrorOther(true);
      } finally {
        setLoadingOther(false);
      }
    }

    fetchExecutiveMembers();
    fetchOtherMembers();
  }, []);

  // Show loading if either is loading
  if (loadingExec || loadingOther) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <span className="text-white text-2xl">Loading...</span>
      </div>
    );
  }


  return (
    <div className="bg-black">
      {/* About Us Hero */}
      <section
        className="relative w-screen h-screen bg-cover lg:bg-fixed lg:bg-fill"
        style={{ backgroundImage: `url(${background1})` }}
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
        style={{ backgroundImage: `url(${background2})` }}
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
        {loadingExec ? <p className="text-white oswald-400">Loading...</p> : (errorExec || executiveMembers.length == 0 )? <DefaultExecMembers /> : <Staff teamMembers={executiveMembers} />}
        <h3 className="text-2xl font-semibold text-left text-white oswald-400">
          Major Contributors
        </h3>
        {loadingOther ? <p className="text-white oswald-400">Loading...</p> : (errorOther || otherMembers.length == 0) ? <DefaultOtherMembers /> : <Staff teamMembers={otherMembers} />}

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
              src={selectedMember.photoUrl}
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
  );
}
