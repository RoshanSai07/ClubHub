import { Routes, Route, Navigate } from "react-router-dom";
import ClubDashboard from "@/pages/club/ClubDashboard";
import ClubMembers from "@/pages/club/ClubMembers";
import CreateEventPage from "@/pages/club/CreateEventPage";
import EditEventPage from "@/pages/club/EditEventPage";
import EventDetailsPage from "@/pages/club/EventDetailsPage";
import DraftEventsPage from "@/pages/club/ClubDraftEvents";
import Settings from "@/pages/club/Settings";
import NotFoundPage from "@/pages/public/NotFoundPage";
import Announcements from "@/pages/club/AnnouncementsPage";
import EventAnalytics from "@/pages/club/EventAnalytics";
import EventRegistrations from "@/pages/club/EventRegistrations";
import ClubDraftEvents from "@/pages/club/ClubDraftEvents";
import ClubAnalytics from "@/pages/club/ClubAnalytics";
const ClubRoutes = () => {
  return (
    <Routes>
      <Route index element={<ClubDashboard />} />
      <Route path="create-event" element={<CreateEventPage />} />
      <Route path="edit-event/:id" element={<EditEventPage />} />
      <Route path="/members" element={<ClubMembers />} />
      <Route path="analytics" element={<ClubAnalytics />} />
      <Route
        path="events/:eventId/analytics"
        element={<EventAnalytics />}
      />
      <Route path="events/:eventId/registrations" element={<EventRegistrations />} />
      <Route path="events/:id" element={<EventDetailsPage />} />

      <Route path="/drafts" element={<ClubDraftEvents />} />
      <Route path="settings" element={<Settings />} />
      <Route path="announcements" element={<Announcements />} />
  
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ClubRoutes;
