import { uploadTimetableImage } from "@/firebase/uploadTimetable";
import { getTimetableFromUpload } from "@/ai/timetable";
import { auth } from "@/firebase/firebase";
import { saveAcademicSchedule } from "@/firebase/academicSchedule";

const AcademicScheduleSection = ({
  timetableImage,
  isEditing,
  uploadStage,
  setUploadStage,
  onTimetableSaved,
  onPreviewClick,
}) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !isEditing) return;

    // 1️⃣ Preview immediately
    const previewUrl = URL.createObjectURL(file);
    onTimetableSaved(previewUrl, { preview: true });

    try {
      // 2️⃣ Uploading
      setUploadStage("uploading");

      const userId = auth.currentUser.uid;

      const downloadURL = await uploadTimetableImage(file, userId);

      // 3️⃣ Save image URL to user preferences
      await onTimetableSaved(downloadURL, { preview: false });

      // 4️⃣ Extract timetable
      setUploadStage("extracting");
      const timetableJSON = await getTimetableFromUpload(downloadURL);

      // 5️⃣ Store extracted timetable (overwrite)
      await saveAcademicSchedule({
        userId,
        timetable: timetableJSON,
        sourceImageURL: downloadURL,
      });

      // 6️⃣ Done
      setUploadStage("done");
    } catch (err) {
      console.error("❌ Timetable process failed:", err);
      setUploadStage("error");
    }
  };

  const isBusy = uploadStage === "uploading" || uploadStage === "extracting";

  return (
    <div className="mt-6">
      <h3 className="text-[22px] font-medium mb-3">Academic Schedule</h3>

      {timetableImage ? (
        <div className="relative">
          <img
            src={timetableImage}
            alt="Timetable"
            onClick={!isBusy ? onPreviewClick : undefined}
            className={`w-full h-40 object-cover rounded border cursor-pointer
              ${isBusy ? "opacity-60" : ""}`}
          />

          {isBusy && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded">
              {uploadStage === "uploading" && "Uploading timetable…"}
              {uploadStage === "extracting" && "Extracting schedule…"}
              <div className="mt-3 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {isEditing && !isBusy && (
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
          {isBusy ? "Processing timetable…" : "Click to Upload Timetable"}

          {isEditing && !isBusy && (
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
