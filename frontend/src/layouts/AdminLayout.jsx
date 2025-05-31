import { Outlet } from 'react-router-dom'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/MainFooter'
import AdminHeader from '../components/adminComponents/AdminHeader'

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <MainFooter />
    </>
  )
}