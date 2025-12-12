import { AuthProvider } from '../context/AuthContext.jsx';
import MainLayout from './MainLayout.jsx';

export default function AdminLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}