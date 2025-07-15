import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import EventsPage from './pages/EventsPage';
import AdminLogin from './pages/adminPages/AdminLogin';
import './App.css';
import AdminHome from './pages/adminPages/AdminHome';
import ProtectedAdminRoute from './components/adminComponents/AdminValidator';
import AdminEvents from './pages/adminPages/AdminEvents';
import AdminAboutUs from './pages/adminPages/AdminAboutUs';
import AdminForgotPassword from './pages/adminPages/AdminForgotPassword';

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
      { path: '', element: <AdminLogin /> },
      { path: 'login', element: <AdminLogin /> },
      { path: 'forgot-password', element: <AdminForgotPassword /> },
      {
        element: <ProtectedAdminRoute />, //protects all admin routes by seeing if user is logged in
        children: [
          { path: 'home', element: <AdminHome /> },
          { path: 'events', element: <AdminEvents /> },
          { path: 'about-us', element: <AdminAboutUs /> },
        ]
      }
    ]
  }
])
/*keeping the route elements in a single folder (pages). If the site grows, we should split it into
  different subfolders within pages, per sub-endpoint */

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
