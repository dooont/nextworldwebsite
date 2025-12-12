import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout.jsx';
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import EventsPage from './pages/EventsPage';
import AdminLogin from './pages/admin/AdminLogin';
import ForgotPasswordRequest from './pages/admin/ForgotPasswordRequest';
import ResetPassword from './pages/admin/ResetPassword';
import './App.css';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminValidator from './components/admin/AdminValidator.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 10 * 60 * 1000, //10 min
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <HomePage /> }, //duplicate home to make it prettier? i guess lol
      { path: '/events', element: <EventsPage /> }, //this will be the events page, but for now it is the same as home
      { path: '/about-us', element: <AboutUs /> },
      /*{ path: '/gallery', element: <Gallery /> },*/
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminLogin />},
      { path: 'login', element: <AdminLogin />}, 
      { path: 'forgot-password', element: <ForgotPasswordRequest /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'dashboard', element: <AdminValidator> <AdminDashboard /> </AdminValidator> }
    ]
  }
])
/*keeping the route elements in a single folder (pages). If the site grows, we should split it into
  different subfolders within pages, per sub-endpoint */

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
