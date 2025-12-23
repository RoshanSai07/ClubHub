import { Routes, Route } from "react-router-dom";

import StudentDashboard from "../pages/student/StudentDashboard";
import MyEventsPage from "../pages/student/MyEventsPage";
import EventPage from "../pages/public/EventsPage";
import ProfilePage from "../pages/student/ProfilePage";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="my-events" element={<MyEventsPage />} />
      <Route path="events" element={<EventPage />} />
      <Route path="dashboard" element={<ProfilePage />} />
    </Routes>
  );
}
