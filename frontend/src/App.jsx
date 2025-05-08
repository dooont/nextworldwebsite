import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import EventsPage from './pages/EventsPage';
import Developers from './pages/Developers';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <HomePage /> }, //duplicate home to make it prettier? i guess lol
      { path: '/events', element: <EventsPage /> }, //this will be the events page, but for now it is the same as home
      { path: '/about-us', element: <AboutUs /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/developers', element: <Developers /> }
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
