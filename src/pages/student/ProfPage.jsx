import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SectionWrapper = ({ title, children, symbol }) => {
  return (
    <div className="space-y-2n z-10 relative px-10 mt-10">
      <div className="flex gap-x-2 items-center">
        <span className="material-symbols-outlined bg-blue-500/50 text-blue-500 p-2 rounded-full">
          {symbol}
        </span>
        <h3 className="font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
};
const RedCTA = ({ text, buttonText, onClick }) => {
  return (
    <div className="flex items-center z-10 relative justify-between ml-10">
      <p className="text-sm text-red-500">{text}</p>
      <button
        onClick={onClick}
        className="btn btn-sm border-none rounded-sm bg-red-500 text-white hover:bg-red-600 px-7"
      >
        <span class="material-symbols-outlined">warning</span>
        {buttonText}
      </button>
    </div>
  );
};

const ProfPage = () => {
  const navigate = useNavigate();
  const userArr = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alexjohnson@college.edu",
      role: "STUDENT",
      avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Alex",
      interests: ["abcdef", "Web Development", "AI & ML", "Hackathons"],
      timetableImage: null,
    },
  ];
  const [user, setUser] = React.useState(userArr[0]);
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    userArr[0].avatar = imageURL; //backendupdate
    setUser((prev) => ({ //frontend update
      ...prev,
      avatar: imageURL,
    }));
  };

  const hasInterests = user.interests.length > 0;
  const hasTimetable = !!user.timetableImage;
  return (
    <div className="h-screen p-y-6 bg-[#f8f9fa] pt-10 pb-30 no-scrollbar overflow-auto scroll-smooth">
      <div className="max-w-4xl mx-auto rounded-xl relative p-4">
        {/* HEADER */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm outline-non absolute top-10"
        >
          ← Back
        </button>
        <div className=" max-w-4xl mx-auto absolute h-[90%] mt-20 w-full bg-white rounded-xl inset-x-0"></div>

        <div className="flex flex-col items-center text-center relative">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-44 h-44 rounded-full bg-blue-100 relative"
          />
          <input
            type="file"
            className="hidden"
            id="profileImg"
            ref={fileInputRef}
            onChange={handleProfileChange}
            accept="image/*"
          />
          <span
            className="material-symbols-outlined p-2 bg-blue-100 text-blue-500 rounded-full absolute bottom-25 right-93"
            onClick={handleImageClick}
          >
            photo_camera
          </span>

          <h2 className="text-lg font-semibold mt-3">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <div className="flex items-center justify-center p-2 gap-2 mt-2 text-xs bg-blue-100 text-blue-600 rounded">
            <span className="material-symbols-outlined">School</span>
            <span className="">{user.role}</span>
          </div>
        </div>

        <SectionWrapper title="Interests" symbol="interests">
          {hasInterests ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {user.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border border-blue-400 text-blue-600 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          ) : (
            <RedCTA
              text="Please select your interests to get personalized notifications."
              buttonText="Select here"
              onClick={() => navigate("/student/settings")}
            />
          )}
        </SectionWrapper>

        <SectionWrapper title="Academic Schedule" symbol="calendar_month">
          {hasTimetable ? (
            <div className="border-2 shadow-sm mt-2 border-dashed rounded-xl p-4 flex justify-center items-center">
              <img
                src={user.timetableImage}
                alt="Timetable"
                className="max-h-48"
              />
            </div>
          ) : (
            <RedCTA
              text="Upload your timetable to get personalized recommendations."
              buttonText="Upload here"
              onClick={() => navigate("/student/settings")}
            />
          )}
        </SectionWrapper>

        <div className="flex justify-end relative z-10 mr-10 mt-20">
          <button
            onClick={() => navigate("/student/settings")}
            className="btn btn-sm rounded-sm bg-[#e3e3e3] border text-gray-700 px-8"
          >
            <span className="material-symbols-outlined">settings</span> Go to
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfPage;
