const users = [
  {
    id: 1,
    name: "Alex Johnson",
    isActive: true,
  },
];

const DangerZoneSection = () => {
  const handleSignOut = () => {
    console.log("User signed out");
    // later → auth logout logic
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    // simulate backend update
    users[0] = {
      ...users[0],
      isActive: false,
    };

    console.log("Account deleted:", users);
  };

  return (
    <div className="mt-10">
      <h2 className="text-[24px] mb-3 text-red-600"></h2>

      <div className="border border-red-300 bg-white p-5 rounded-md space-y-4">
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-red-500">
             End your current session on this device
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="px-10 py-2 border border-red-400 text-red-600 rounded-sm bg-red-100"
          >
            Sign out
          </button>
        </div>

      

        {/* Delete Account */}
        <div className="flex justify-between items-center">
          <div>
            <p className=" text-red-500">
              Permanently remove your account and associated data
            </p>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangerZoneSection;
