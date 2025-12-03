import ArticlesAdminSection from '../../components/admin/sections/ArticlesAdminSection.jsx';
import MembersAdminSection from '../../components/admin/sections/MembersAdminSection.jsx';
import UpcomingEventsAdminSection from '../../components/admin/sections/UpcomingEventsAdminSection.jsx';


export default function AdminDashboard() {
  return (
    <div className="bg-black min-h-screen w-screen py-12 px-6 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-bold text-white racing-sans-one-regular mb-2">
        Admin Dashboard
      </h1>
      {/*<ArticlesAdminSection />*/}
      {/*<UpcomingEventsAdminSection />*/}
      <MembersAdminSection />
    </div>
  );
}