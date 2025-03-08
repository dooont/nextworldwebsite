import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from '../components/MainHeader'

export default function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  )
}
