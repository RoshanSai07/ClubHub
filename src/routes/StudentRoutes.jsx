import { Routes, Route } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardS/DashboardLayout";
import StudentDashboard from "../pages/student/StudentDashboard";
import MyEventsPage from "../pages/student/MyEventsPage";
import EventPage from "../pages/public/EventsPage";
import ProfilePage from "../pages/student/ProfilePage";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<StudentDashboard />} />

        <Route path="my-events" element={<MyEventsPage />} />
        <Route path="events" element={<EventPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
