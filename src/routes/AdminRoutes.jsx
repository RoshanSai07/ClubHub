import React from 'react'
import {Route,Routes} from "react-router-dom"
import ClubManagementPage from "../pages/admin/ClubManagementPage";
import AdminDashboard from "../pages/admin/AdminDashboard";



const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/ManageClubs" element={<ClubManagementPage />} />
    </Routes>
  )
}

export default AdminRoutes
