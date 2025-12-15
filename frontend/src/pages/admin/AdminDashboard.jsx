import ArticlesAdminSection from '../../components/admin/sections/ArticlesAdminSection.jsx';
import MembersAdminSection from '../../components/admin/sections/MembersAdminSection.jsx';
import UpcomingEventsAdminSection from '../../components/admin/sections/UpcomingEventsAdminSection.jsx';
import PastEventsAdminSection from '../../components/admin/sections/PastEventsAdminSection.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../services/authService.js';
import Button from '../../components/ui/Button.jsx';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { setAccessToken, setIsAuthenticated } = useAuth();
  
  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken(null);
      setIsAuthenticated(false);
      navigate('/admin/login');
    }
  });

  return (
    <div className="bg-black min-h-screen w-screen py-12 px-6 flex flex-col items-center gap-10 relative">
      <div className="absolute top-6 right-6">
        <Button onClick={() => logoutUser()} disabled={isPending}>
          {isPending ? 'Logging out...' : 'Logout'}
        </Button>
      </div>

      <h1 className="text-5xl font-bold text-white racing-sans-one-regular mb-2">
        Admin Dashboard
      </h1>
      <ArticlesAdminSection />
      <UpcomingEventsAdminSection />
      <MembersAdminSection />
      <PastEventsAdminSection />
    </div>
  );
}