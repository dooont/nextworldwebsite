import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData(prevVals => ({
      ...prevVals,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/admin/login', formData, {
        withCredentials: true
      });
      navigate('/admin/home');
    } catch (e) {
      setAuthenticated(false);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-[80vh]">
        <form onSubmit={handleSubmit} className="text-white flex flex-col">
          <label htmlFor="email">Email</label>
          <input className="border border-white pl-2 rounded" onChange={handleChange} name="email" type="text" placeholder="Email" />
          <label htmlFor="password">Password</label>
          <input className="border border-white pl-2 rounded" onChange={handleChange} name="password" type="text" placeholder="Password" />
          <button className="oswald-700 mt-6 px-4 py-1 bg-purple-950 hover:bg-purple-800 text-white rounded-lg font-semibold transition">
            Login
          </button>
        </form>
        <Link to="/admin/forgot-password" className="text-purple-800 oswald-400 hover:text-purple-600">Forgot Password?</Link>
        <p className="text-fuchsia-500">{authenticated === false ? "Credentials not valid" : ""}</p>
      </div>
    </>
  )
}