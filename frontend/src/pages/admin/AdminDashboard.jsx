import ArticlesAdmin from '../../components/admin/ArticlesAdmin.jsx';

export default function AdminDashboard() {
  return (
    <div className="bg-black min-h-screen w-screen py-12 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-white racing-sans-one-regular mb-2">
        Admin Dashboard
      </h1>
      <ArticlesAdmin />
    </div>
  );
}