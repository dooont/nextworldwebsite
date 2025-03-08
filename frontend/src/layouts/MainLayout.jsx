import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from '../components/MainHeader'

export default function MainLayout() {
  return (
    <>
      <MainHeader /> {/*If problems with layout arise, its due to not putting content in the content part of the drawer menu*/}
      <Outlet />
    </>
  )
}
