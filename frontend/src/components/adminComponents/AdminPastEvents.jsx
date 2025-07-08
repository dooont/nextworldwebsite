import { useState } from 'react';
import React from 'react';
import axios from 'axios';

export default function AdminPastEvents({ pastEvents, handleEventClick, onDeletePastEvent }) {
  const [artists, setArtists] = useState([{
    name: '',
    contact: '',
  }]);
  const [submitUnsuccessful, setSubmitUnsuccessful] = useState(false);
  const [selectedFile, setSelectedFile] = useState('No file selected');


  function handleAddArtist(e) {
    e.preventDefault();
    const newArtists = [...artists];
    newArtists.push(
      {
        name: '',
        contact: '',
      })
    setArtists(newArtists);
  }

  function handleRemoveArtist(indexToRemove, e) {
    e.preventDefault();
    const updatedArtists = artists.filter((a, i) => i !== indexToRemove);
    setArtists(updatedArtists);
  }

  function handleArtistInput(index, e) {
    const value = e.target.value;
    const property = e.target.name;
    let updatedArtists = [...artists];
    updatedArtists[index] = {
      ...updatedArtists[index],
      [property]: value
    }
    setArtists(updatedArtists);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    //create form data and append artists as a string
    let formData = new FormData(e.target);
    formData.append('artists', JSON.stringify(artists));
    try {
      await axios.post("http://localhost:3000/past-events", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', //not needed for most backend frameworks, but some do so ill keep it
        },
        withCredentials: true
      })
      setSubmitUnsuccessful(false);
      e.target.reset();
    } catch (e) {
      setSubmitUnsuccessful(true);
    }
  }

  function handleFlyerChange(e) {
    setSelectedFile(e.target.files[0].name);
  }

  async function handleDeletePastEvent(pastEventId) {
    try {
      console.log("clicked!")
      await axios.delete("http://localhost:3000/past-events/" + pastEventId, {
        withCredentials: true
      });
      onDeletePastEvent(pastEventId);
    } catch (e) {

    }
  }

  if (pastEvents === null) {
    return <p className="text-white">Loading</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {/*FORM*/}
      <form onSubmit={handleSubmitForm} className="group bg-purple-950 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col h-full  overflow-y-auto max-h-full items-center justify-evenly gap-1">
        <div>
          <label htmlFor="pastFlyer" className="text-white hover:text-black transition font-bold block text-center">Upload Flyer</label>
          <input onChange={handleFlyerChange} name="pastFlyer" id="pastFlyer" type="file" className="border pl-2 text-white text-sm w-full ml-2 hidden block" required />
          {selectedFile === 'No file selected' ? <p className="text-gray-500">no file selected</p> : <p className="text-white text-center">{selectedFile}</p>}
        </div>
        <div className="w-3/5">
          <label htmlFor="title" className="text-white">title</label>
          <input name="title" placeholder="title" className="border pl-2 text-white text-sm" required />
        </div>
        <div className="w-3/5">
          <label htmlFor="subtitle" className="text-white">date</label>
          <input name="subtitle" type="date" placeholder="date" className="border pl-2 text-white text-sm block w-full" required />
        </div>
        <div className="w-3/5">
          <label htmlFor="desc" className="text-white">description</label>
          <input name="desc" placeholder="description" className="border pl-2 text-white text-sm block" required />
        </div>
        <div className="w-3/5">
          <label htmlFor="place" className="text-white">place</label>
          <input name="place" placeholder="place" className="border pl-2 text-white text-sm block" required />
        </div>

        <h3 className="text-white font-bold">Artists:</h3>
        {/* Artist inputs */}
        <div className="w-3/5">
          {artists.map((artist, index) => {
            return (
              <React.Fragment key={index}>
                <label htmlFor={`artist${index + 1}`} className="text-white">Artist {index + 1}</label>
                <button onClick={() => handleRemoveArtist(index, event)} className="bg-red-400 ml-2 text-white text-xs hover:bg-white hover:text-red-400">Remove</button>
                <input onChange={() => handleArtistInput(index, event)} name="name" placeholder="name" className="border pl-2 text-white text-sm block" required />
                <input onChange={() => handleArtistInput(index, event)} name="contact" placeholder="instagram" className="border pl-2 text-white text-sm block mb-4" required />
              </React.Fragment>)
          })}
          <button onClick={handleAddArtist} className="text-white bg-black px-4 mt-2 hover:text-black hover:bg-white transition">Add Other Artist</button>
        </div>


        <div>
          {/*artists.length === 0 ? undefined : artists.map((artist, i)=>{
            <input name={i} value={artist.name}/>
          })*/}
        </div>
        {submitUnsuccessful ? <p className="text-red-600">Could not upload event</p> : undefined}
        <button className="w-5/6 text-white bg-black  hover:text-black hover:bg-white transition mb-2">Add Event</button>
      </form >
      {pastEvents.length > 0 ?
        pastEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => handleEventClick(event)}
            className="group bg-purple-950 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col h-full"
          >
            <div className="relative h-40 w-full overflow-hidden bg-[#4b0082]">
              <img src={event.imageURL} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#4b0082] bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity" />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-xl font-semibold text-white bebas-kai-regular">
                {event.title}
              </h3>
              <p className="text-gray-200 text-sm oswald-400">
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                }).format(new Date(event.subtitle.split('T')[0]))}
              </p>
            </div>
            <div className="flex justify-center w-full px-6">
              <button onClick={(e) => { e.stopPropagation(); handleDeletePastEvent(event.id) }} className="text-white w-5/6 mb-2 bg-red-500 hover:bg-black transition">Delete</button>
            </div>
          </div>
        )) : <p className="text-white">No Past Events Found</p>
      }
    </div >
  )
}