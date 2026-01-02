import Navbar from "../DashboardS/Navbar";
import FooterPage from "../landing/FooterPage";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <FooterPage />
    </>
  );
};

export default DashboardLayout;
