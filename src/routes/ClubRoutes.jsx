import React from 'react'
import {Routes,Route} from "react-router-dom"
import ClubDashboard from "../pages/club/ClubDashboard"
import CreateEventPage from "../pages/club/CreateEventPage"
import EditEventPage from "../pages/club/EditEventPage"
const ClubRoutes = () => {
  return (
    <div>
        <Routes>
      <Route path="/" element={<ClubDashboard />} />
      <Route path="create-event" element={<CreateEventPage />} />
      <Route path="edit-event" element={<EditEventPage />} />
      </Routes>
    </div>
  )
}

export default ClubRoutes
