import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/MainFooter'
import EasterEgg from '../components/EasterEgg'

export default function MainLayout() {
  return (
    <>
      <MainHeader />
      <EasterEgg />
      <Outlet />
      <MainFooter />
    </>
  )
}
