import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

const user = {
  name: "Alex Johnson",
  email: "alexjohnson@college.edu",
  role: "STUDENT",
  avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Alex",
  interests: ["Web Development", "AI & ML", "Hackathons"],
  timetableImage: null, // ✅ comma fixed
};
const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm hover:text-gray-900"
      >
        ← Back
      </button>

      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-28 h-28 rounded-full"
        />
        
        <h2 className="mt-3 font-semibold text-lg">{user.name}</h2>
        <h2>hello</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
        <span className="mt-2 text-xs px-3 py-1 rounded bg-blue-100 text-blue-600">
          {user.role}
        </span>
      </div>

      {/* Preferences */}
      <div className="bg-white border rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          ⚙ Preferences
        </div>

        {user.interests.length > 0 ? (
            <div>
                <p className="text-sm text-gray-500">Selected Preferences for event Recommendations</p>
          <div className="flex flex-wrap gap-2 mt-3">
            
           
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
          </div>
        ) : (
          <p className="text-sm text-red-500">
            No interests selected. Please choose them in Settings.
          </p>
        )}
      </div>

      {/* Academic Schedule */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-medium text-gray-800">Academic Schedule</h3>

        {user.timetableImage ? (
          <img
            src={user.timetableImage}
            alt="Timetable"
            className="w-full max-w-xl mx-auto rounded-lg border"
          />
        ) : (
          <div className="border border-dashed rounded-lg p-8 text-center text-sm text-gray-500">
            No timetable uploaded. Please upload it in Settings.
          </div>
        )}
      </div>

      {/* Go to Settings */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/student/settings")}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded text-sm"
        >
          <Settings size={16} />
          Go to Settings
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
