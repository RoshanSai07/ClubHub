const AcademicScheduleSection = ({
  timetableImage,
  isEditing,
  onTimetableChange,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    onTimetableChange(imageURL);
  };

  return (
    <div className="mt-8">
      <h2 className="text-[24px] mb-3">Academic Schedule</h2>

      {timetableImage ? (
        <div className="relative">
          <img
            src={timetableImage}
            alt="Timetable"
            className="w-full h-40 object-cover rounded border"
          />

          {isEditing && (
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer text-white rounded">
              Change Timetable
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      ) : (
        <label
          className={`h-28 border-2 border-dashed rounded flex items-center justify-center
          ${isEditing ? "cursor-pointer text-gray-500" : "text-gray-300"}`}
        >
          Click to Upload Timetable
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          )}
        </label>
      )}
    </div>
  );
};

export default AcademicScheduleSection;
