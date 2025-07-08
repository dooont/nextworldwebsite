import { useState } from 'react';
import axios from 'axios';

export default function AdminUpcomingEvents({ upcomingEvents, onRefreshPage }) {
  //for pretty file inputs
  const [selectedFile, setSelectedFile] = useState('No file selected');
  const [invalidForm, setInvalidForm] = useState(false);
  const [submitUnsuccessful, setSubmitUnsuccessful] = useState(false);

  //handles submission of upcoming event
  function handleFlyerChange(e) {
    setSelectedFile(e.target.files[0].name);
  }

  async function handleSubmitForm(e) {
    //validate form. Did manual validation here, but for admin past events, input just has required (practice for both)
    e.preventDefault();
    const form = new FormData(e.target);
    if (form.get('flyerImage').size === 0) {
      setInvalidForm(true);
      console.log("flyer");
      return;
    }
    if (!form.get("title").trim()) {
      setInvalidForm(true);
      console.log("title");
      return;
    }
    if (!form.get("subtitle").trim()) {
      setInvalidForm(true);
      console.log("subtitle");
      return;
    }
    if (!form.get("url").trim()) {
      setInvalidForm(true);
      console.log("url");
      return;
    }

    setInvalidForm(false);
    try {
      await axios.post("http://localhost:3000/upcoming-events", form, {
        headers: {
          'Content-Type': 'multipart/form-data', //not needed for most backend frameworks, but some do so ill keep it
        },
        withCredentials: true
      });
      setSubmitUnsuccessful(false);
      onRefreshPage();
    } catch (e) {
      setSubmitUnsuccessful(true);
    }
  }

  async function handleDeleteUpcomingEvent(eventId) {
    try {
      await axios.delete("http://localhost:3000/upcoming-events/" + eventId, {
        withCredentials: true
      })
      onRefreshPage();
    } catch (e) {
      console.log("Could not delete event: ", e.response.body);
    }
  }

  if (upcomingEvents === null) {
    return <h2 className="text-white">Loading Events</h2>
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr mb-8">
      {/*FORM*/}
      <form
        className="group bg-purple-950 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col h-full items-center justify-evenly"
        onSubmit={handleSubmitForm}
      >
        <div>
          <label htmlFor="flyerImage" className="text-white hover:text-black transition font-bold block text-center">Upload Flyer</label>
          <input onChange={handleFlyerChange} name="flyerImage" id="flyerImage" type="file" className="border pl-2 text-white text-sm w-full ml-2 hidden block" required />
          {selectedFile === 'No file selected' ? <p className="text-gray-500">no file selected</p> : <p className="text-white text-center">{selectedFile}</p>}
        </div>
        <div className="w-3/5">
          <label htmlFor="title" className="text-white block">title</label>
          <input name="title" placeholder="title" className="border pl-2 text-white text-sm" />
        </div>
        <div className="w-3/5">
          <label htmlFor="subtitle" className="text-white">Date</label>
          <input name="subtitle" type="date" placeholder="date" className="border pl-2 text-white text-sm block w-full" />
        </div>
        <div className="w-3/5">
          <label htmlFor="url" className="text-white">ticket link</label>
          <input name="url" placeholder="ticket link" className="border pl-2 text-white text-sm block" />
        </div>
        {invalidForm ? <p className="text-red-600">Fill Out All Fields</p> : undefined}
        {submitUnsuccessful ? <p className="text-red-600">Could not upload event</p> : undefined}
        <button className="w-5/6 text-white bg-black  hover:text-black hover:bg-white transition m-2">Add Event</button>
      </form>
      {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
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
              {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              }).format(new Date(event.subtitle.split('T')[0]))}
            </p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); handleDeleteUpcomingEvent(event.id) }} className="text-white bg-red-500 mx-2 mb-2 hover:text-black hover:bg-white transition">Delete</button>
        </div>
      )) : <p className="text-white">No Upcoming Events Found</p>}

    </div >)

}