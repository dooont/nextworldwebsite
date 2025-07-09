import { useState } from 'react';
import axios from 'axios';

//accepts "type" prop, which is determines which group is in (ex: executive or other), NOT the members individual role.
//the type prop is determined by which group the admin creates a new user from
export default function AdminStaff({ members, type, onRefresh }) {
  const [selectedMember, setSelectedMember] = useState(null);
  //for pretty file inputs
  const [selectedFile, setSelectedFile] = useState('No file selected'); //just stores file name
  const [invalidForm, setInvalidForm] = useState(false);
  const [submitUnsuccessful, setSubmitUnsuccessful] = useState(false);

  //handles submission of member image
  function handleFlyerChange(e) {
    console.log("this is e.target.files", e.target.files);
    //sets default message back when file was removed!
    if (e.target.files.length === 0) {
      setSelectedFile('No file selected');
    } else {
      setSelectedFile(e.target.files[0].name);
    }
  }

  async function handleSubmitForm(e) {
    //validate form
    e.preventDefault();

    if (selectedFile === 'No file selected') {
      setInvalidForm(true);
      console.log("photo");
      return;
    }
    const form = new FormData(e.target);
    form.append('type', type);

    /* this code causes the unfocusable error when empty so use the state to determine if photo was updated (happens before tryiing to create form data)
    this is handling file uploads the best way as it will display a custom message to user
    if (form.get("photo").size === 0) {
      setInvalidForm(true);
      console.log("photo");
      return;
    }*/
    if (!form.get("firstName").trim()) {
      setInvalidForm(true);
      console.log("firstName");
      return;
    }
    if (!form.get("lastName").trim()) {
      setInvalidForm(true);
      console.log("lastName");
      return;
    }
    if (!form.get("role").trim()) {
      setInvalidForm(true);
      console.log("role");
      return;
    }
    if (!form.get("desc").trim()) {
      setInvalidForm(true);
      console.log("desc");
      return;
    }
    if (!form.get("funFact").trim()) {
      setInvalidForm(true);
      console.log("funFact");
      return;
    }

    setInvalidForm(false);

    try {
      await axios.post("http://localhost:3000/members", form, {
        headers: {
          'Content-Type': 'multipart/form-data', //not needed for most backend frameworks, but some do so ill keep it
        },
        withCredentials: true
      });
      setSubmitUnsuccessful(false);
      onRefresh();
      e.target.reset();
    } catch (e) {
      setSubmitUnsuccessful(true);
    }
  }

  async function onDeleteMember(memberId) {
    try {
      await axios.delete("http://localhost:3000/members/" + memberId);
      onRefresh();
    } catch (e) {
    }
  }

  if (members === null) {
    return <p className="text-white">Loading...</p>
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-4 gap-8 auto-rows-fr">
        <form
          onSubmit={handleSubmitForm}
          className="
            group
            bg-purple-950
            rounded-lg
            overflow-hidden
            shadow-lg
            cursor-pointer
            transform transition
            hover:scale-105 hover:shadow-2xl
            flex
            flex-col
            justify-center
            items-center
            h-full
            overflow-y-auto
            max-h-full
            gap-4
          "
        >
          <h2 className="text-white font-bold mt-2">New {type.charAt(0).toUpperCase() + type.slice(1)} Member</h2>
          <div>
            <label htmlFor={type + "ImageInput"} className="text-white hover:text-black transition font-bold block text-center">Upload Photo</label>
            <input onChange={handleFlyerChange} name="photo" id={type + "ImageInput"} type="file" className="border pl-2 text-white text-sm w-full ml-2 opacity-0 absolute block" /> {/*absolute and opacity allows it to be invisible while not hidden, bypassing the "unfocusable" error that prevents the submit function from running*/}
            {selectedFile === 'No file selected' ? <p className="text-gray-500">no file selected</p> : <p className="text-white text-center">{selectedFile}</p>}
          </div>

          <div>
            <label htmlFor="firstName" className="text-white">first name</label>
            <input name="firstName" placeholder="first name" className="border pl-2 text-white text-sm block w-full" />
          </div>
          <div>
            <label htmlFor="lastName" className="text-white">last name</label>
            <input name="lastName" placeholder="last name" className="border pl-2 text-white text-sm block w-full" />
          </div>
          <div>
            <label htmlFor="role" className="text-white">role</label>
            <input name="role" placeholder="role" className="border pl-2 text-white text-sm block w-full" />
          </div>
          <div>
            <label htmlFor="desc" className="text-white">description</label>
            <input name="desc" placeholder="description" className="border pl-2 text-white text-sm block w-full" />
          </div>
          <div>
            <label htmlFor="funFact" className="text-white">fun fact</label>
            <input name="funFact" placeholder="fun fact" className="border pl-2 text-white text-sm block w-full" />
          </div>
          {invalidForm ? <p className="text-red-600">Fill Out All Fields</p> : undefined}
          {submitUnsuccessful ? <p className="text-red-600">Could not upload member</p> : undefined}
          <button className="w-5/6 text-white bg-black  hover:text-black hover:bg-white transition mb-2">Add Member</button>
        </form>
        {members.length > 0 ? members.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="
            group
            bg-purple-950
            rounded-lg
            overflow-hidden
            shadow-lg
            cursor-pointer
            transform transition
            hover:scale-105 hover:shadow-2xl
          "
          >
            <img
              src={member.photoUrl}
              alt={member.firstName + " " + member.lastName}
              className="w-full h-48 object-cover object-top"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-medium text-white bebas-kai-regular">
                {member.firstName + " " + member.lastName}
              </h3>
              <p className="text-gray-400 oswald-400">{member.role}</p>
            </div>
            <div className="w-full p-2">
              <button onClick={(e) => { e.stopPropagation(); onDeleteMember(member.id) }} className="bg-red-500 text-white w-full">Delete</button>
            </div>
          </div>
        )) : <p className="text-white">No Members Found!</p>}
      </div>

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
            className="
              relative
              bg-gray-900
              rounded-lg
              p-8
              max-w-2xl w-full mx-4
              flex flex-col md:flex-row
              items-center md:items-start
              space-y-6 md:space-y-0 md:space-x-8
              z-10
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo on the left */}
            <img
              src={selectedMember.photoUrl}
              alt={selectedMember.firstName + " " + selectedMember.lastName}
              className="w-48 h-48 object-cover rounded-lg flex-shrink-0 object-top"
            />

            {/* Description on the right */}
            <div className="text-white flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">
                    {selectedMember.firstName + " " + selectedMember.lastName}
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
                <p>{selectedMember.desc}</p>
                <p><strong>Fun Fact:</strong> {selectedMember.funFact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
