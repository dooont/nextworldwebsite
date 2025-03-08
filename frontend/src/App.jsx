import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs';
import MeetTeam from './pages/MeetTeam';
import './App.css';
import { Theme } from 'react-daisyui';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <HomePage /> }, //duplicate home to make it prettier? i guess lol
      { path: '/about-us', element: <AboutUs /> },
      { path: '/meet-the-team', element: <MeetTeam /> }
    ]
  }
])
/*keeping the route elements in a single folder (pages). If the site grows, we should split it into
  different subfolders within pages, per sub-endpoint */

function App() {
  return (
    <Theme dataTheme="dracula">
      <RouterProvider router={router} />
    </Theme>
  )
}

export default App
