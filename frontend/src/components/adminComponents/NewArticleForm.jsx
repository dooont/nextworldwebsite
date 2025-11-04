import { useState } from "react";
import axios from "axios";

export default function NewArticleForm({onSuccess}){
    const [submissionUnsuccessful, setSubmissionUnsuccessful] = useState(false);
    const [formData, setFormData] = useState({
      title: '',
      source: '',
      date: '',
      description: '',
      link: ''
    });
  
    function onChange(e) {
      setFormData((oldData) => {
        return {
          ...oldData,
          [e.target.name]: e.target.value
        }
      })
    }
  
    async function handleSubmitForm(e) {
      e.preventDefault();
  
      try {
        setSubmissionUnsuccessful(false);
        await axios.post('http://localhost:3000/articles', formData, {
          withCredentials: true,
        });
        onSuccess();
        e.target.reset();
      } catch (e) {
        setSubmissionUnsuccessful(true);
      }
    }

    return(
        <form onSubmit={handleSubmitForm} className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-2 w-full">
        <h1 className="text-xl font-bold text-center w-full">Add New Article</h1>
        <div>
          <label htmlFor="title" className="block">title</label>
          <input onChange={onChange} placeholder="title" name="title" className="border-white border-1 pl-2 w-full" required />
        </div>
        <div>
          <label htmlFor="source" className="block">source name</label>
          <input onChange={onChange} placeholder="source" name="source" className="border-white border-1 pl-2 w-full" required />
        </div>
        <div>
          <label htmlFor="date" className="block">date</label>
          <input onChange={onChange} type="date" placeholder="date" name="date" className="border-white border-1 pl-2 w-full" required />
        </div>
        <div>
          <label htmlFor="description" className="block">description</label>
          <input onChange={onChange} placeholder="description" name="description" className="border-white border-1 pl-2 w-full" required />
        </div>
        <div>
          <label htmlFor="link" className="block">link</label>
          <input onChange={onChange} placeholder="link" name="link" className="border-white border-1 pl-2 w-full" required />
        </div>
        <button className="text-white bg-black mx-2 mb-2 hover:text-black hover:bg-white transition">Add Article</button>
        {submissionUnsuccessful && <p className="text-red-500">Article Not Created!</p>}
      </form>
    )
}