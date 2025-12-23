import React from 'react'
import Navbar from '../../components/layout/landing/Navbar'
import Hero from '../../components/layout/landing/Hero'
import Features from '../../components/layout/landing/Features'
import Upcoming from '@/components/layout/landing/Upcoming'
import FooterPage from '@/components/layout/landing/FooterPage'



const LandingPage = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll no-scrollbar">
      <div><Navbar /></div>
      <Hero/>
      <Features></Features>
      <Upcoming/>
      <FooterPage />
    </div>
  )
}

export default LandingPage
