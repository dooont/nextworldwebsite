import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import EventsPage from './pages/EventsPage';
import AdminLogin from './pages/admin/AdminLogin';
import './App.css';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

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
    element: <MainLayout />,
    children: [
      {path: '/admin/login', element: <AdminLogin />},
      /*admin validator parent here*/
      { path: '/admin/dashboard', element: <AdminDashboard />}
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
