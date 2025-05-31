import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loading from './AdminLoading';

export default function ProtectedAdminRoute() {
  const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function authenticate() {
      try {
        const response = await axios.get('http://localhost:3000/admin/sessions', {
          withCredentials: true
        })
        setAuthenticated(true);
      } catch (e) {
        navigate("/admin/login");
      }
    }
    authenticate();
  }, []);

  if (authenticated === null) { return <Loading /> }
  if (authenticated) {
    return <Outlet />
  }
}