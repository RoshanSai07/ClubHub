import Navbar from '../DashboardS/Navbar'
import FooterPage from '../landing/FooterPage'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col h-screen overflow-y-scroll no-scrollbar">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterPage />
    </div>
  )
}

export default DashboardLayout
