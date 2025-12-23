import React from 'react'
import {Routes,Route} from "react-router-dom"

import LoginPage from '../pages/public/LoginPage'
import LandingPage from '../pages/public/LandingPage'
import SingupPage from '../pages/public/SingupPage'
import SingupPage2 from '@/pages/public/SingupPage2'
const PublicRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="/" element={<LandingPage/>} />
      <Route path="singup1" element={<SingupPage />} />
      <Route path="singup2" element={<SingupPage2 />} />
      <Route path="auth" element={<h1>Google Auth Page</h1>} />
      </Routes>
    </div>
  )
}

export default PublicRoutes;
