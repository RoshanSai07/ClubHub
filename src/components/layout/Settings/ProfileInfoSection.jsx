import { useState, useRef } from "react";
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alexjohnson@college.edu",
    role: "STUDENT",
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Alex",
    interests: ["abcdef", "Web Development", "AI & ML", "Hackathons"],
    timetableImage: null,
    phoneNumber: "9999999999",
  },
];

const ProfileInfoSection = () => {
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatar: imageURL,
    }));
  };
  // backend → UI
  const [user, setUser] = useState(users[0]);

  // edit mode
  const [isEditing, setIsEditing] = useState(false);

  // temporary form state
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // save changes
  const handleSave = () => {
    // 1️⃣ update UI
    setUser(formData);

    // 2️⃣ update backend
    users[0] = {
      ...users[0],
      ...formData,
    };

    // 3️⃣ exit edit mode
    setIsEditing(false);

    console.log("Backend updated:", users);
  };

  return (
    <div className=" space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span
          class="material-symbols-outlined text-blue-500"
          style={{ fontSize: "32px" }}
        >
          person_edit
        </span>
        <h1 className="text-[26px]">Profile Info</h1>
      </div>
      <div className="bg-white p-5 rounded-md border flex flex-col">
        <div className="flex items-center justify-end ">
          {!isEditing ? (
            <div className="border px-4 py-2 rounded-sm flex  gap-2 items-center ">
              <span className="material-symbols-outlined">edit</span>
              <button
                className="text-blue-600 text-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="border px-4 py-2 rounded-sm flex  gap-2 items-center">
              <span className="material-symbols-outlined">save</span>
              <button className="text-green-600 text-sm" onClick={handleSave}>
                Save
              </button>
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="flex gap-5 md:flex-row md:items-center flex-col">
          <div className="relative p-2">
            <img
              src={formData.avatar}
              alt="avatar"
              className="w-44 h-44 rounded-full bg-blue-100 relative"
            />
            {isEditing && (
              <div>
                <input
                  type="file"
                  className="hidden"
                  id="profileImg"
                  ref={fileInputRef}
                  onChange={handleProfileChange}
                  accept="image/*"
                />
                <span
                  className="material-symbols-outlined p-2 bg-blue-100 text-blue-500 rounded-full absolute top-35 right-5"
                  onClick={handleImageClick}
                >
                  photo_camera
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col md:gap-5 gap-2 w-[80%]">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-500">Display Name</label>
              {isEditing ? (
                <div className=" border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="outline-none w-full"
                  />
                </div>
              ) : (
                <p className="border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                  {user.name}
                </p>
              )}
            </div>

            <div className="flex md:gap-10 flex-col md:flex-row sm:gap-5 w-full">
              <div className="w-full">
                <label className="text-sm text-gray-500">Email Address</label>
                {isEditing ? (
                  <div className="w-full border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="outline-none w-full"
                    />
                  </div>
                ) : (
                  <p className="border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                    {user.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="w-full">
                <label className="text-sm text-gray-500">Phone Number</label>
                {isEditing ? (
                  <div className="w-full border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full outline-none"
                    />
                  </div>
                ) : (
                  <p className="border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                    {user.phone || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
