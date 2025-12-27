
import HeaderSection from "@/components/layout/Settings/HeaderSection";
import ProfileInfoSection from "@/components/layout/Settings/ProfileInfoSection";
import PreferencesSection from "@/components/layout/Settings/PreferencesSection";
import NotificationsSection from "@/components/layout/Settings/NotificationsSection";
import DangerZoneSection from "@/components/layout/Settings/DangerZoneSection";
// const user = {
//   id: "u_001",

//   // 🔹 Basic identity
//   name: "Alex Johnson",
//   email: "alexjohnson@college.edu",
//   phoneNumber: "9999999999",
//   role: "STUDENT",

//   // 🔹 Profile visuals
//   avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Alex",

//   // 🔹 Preferences section
//   interests: [
//     "Web Development",
//     "AI & ML",
//     "Hackathons"
//   ],

//   // 🔹 Academic schedule section
//   timetableImage: "https://cdn.app.com/timetables/u_001.png",
//   // or null if not uploaded

//   // 🔹 Notifications section
//   notifications: {
//     eventReminders: true,
//     hiringAlerts: false,
//     feedbackRequests: true
//   },

//   // 🔹 Account / system
//   isActive: true,
//   createdAt: "2025-01-10T10:30:00Z",
//   updatedAt: "2025-03-26T08:45:00Z"
// };

const SettingsPage = () => {
  return (
    <div className="bg-gray-50 min-w-fit">
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50">
      <HeaderSection />
      <ProfileInfoSection />
      <PreferencesSection />
      <NotificationsSection />
      <DangerZoneSection />
    </div>
    </div>
  );
};

export default SettingsPage;
