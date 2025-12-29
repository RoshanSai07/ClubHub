import {
  Upload,
  Plus,
  ClipboardEdit,
  Building2,
  CalendarClock,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getUserById , getClubById} from "@/firebase/collections";
import { auth } from "@/firebase/firebase";

const buildDateTime = (date, time) =>
  date && time ? new Date(`${date}T${time}`) : null;

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (date, time) => {
  const d = new Date(`${date}T${time}`);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const CATEGORY_OPTIONS = [
    "Hackathon",
    "Workshop",
    "Seminar",
    "Club",
    "Music",
    "Tech",
    "Art",
    "Sports",
  ];

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      categories: [],
      highlights: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });

  const selectedCategories = watch("categories") || [];

  /* ---------------- RESTORE LOCAL DRAFT ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("eventDraft");
    if (!saved) return;

    const data = JSON.parse(saved);
    Object.entries(data).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [setValue]);

  /* ---------------- AUTOSAVE LOCAL DRAFT ---------------- */
  const watched = watch();
  useEffect(() => {
    localStorage.setItem("eventDraft", JSON.stringify(watched));
  }, [watched]);

  const onSubmit = async (formData) => {
    console.log("SUBMIT STARTED", formData);
    if (!formData.categories || formData.categories.length === 0) {
      alert("Please select at least one category");
      return;
    }
    try {
      const startDateTime = buildDateTime(formData.startDate, formData.startTime);
      let endDateTime = buildDateTime(formData.endDate, formData.endTime);

      if (endDateTime <= startDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1);
      }

      const user = auth.currentUser;
      if (!user) {
        alert("User not logged in");
        return;
      }

      // 🔐 check auth + approval
      const userDoc = await getUserById(user.uid);
      if (!userDoc || userDoc.role !== "CLUB" || userDoc.isApproved !== true) {
        alert("Only approved club accounts can create events");
        return;
      }

      // 🏫 fetch club profile
      const club = await getClubById(user.uid);
      if (!club) {
        alert("Club profile not found. Contact admin.");
        return;
      }
      
      const eventTypeThemeMap = {
        Workshop: "yellow",
        Seminar: "blue",
        Club: "green",
        Music: "red",
        Tech: "blue",
        Art: "yellow",
        Sports: "green",
        Hackathon: "yellow",
      };

      const payload = {
        clubId: user.uid,                 // ✅ auth uid
        clubName: club.clubName,          // ✅ from clubs collection
        head: club.presidentName,         // ✅ correct field

        title: formData.title,
        description: formData.description,
        highlights: formData.highlights.filter(Boolean),

        image: "https://picsum.photos/seed/event/600/400",

        location: {
          venue: formData.venue,
          college: formData.college,
          area: formData.area,
        },

        attendees: formData.attendees,
        date: formatDate(formData.startDate),

        startDateTime,
        endDateTime,

        time: {
          start: formatTime(formData.startDate, formData.startTime),
          end: formatTime(formData.endDate, formData.endTime),
        },

        registeredUsers: [],
        status: "upcoming",

        categories: formData.categories,
        type: formData.categories[0],
        theme: eventTypeThemeMap[formData.categories[0]] || "green",

        feedbackFormLink: formData.feedbackFormLink || "",
        createdAt: serverTimestamp(),
      };
      console.log("WRITING EVENT...");
      await addDoc(collection(db, "events"), payload);
      console.log("WRITE SUCCESS");
      localStorage.removeItem("eventDraft");
      alert("✅ Event published successfully");
      navigate(-1);
    } catch (err) {
      console.error("🔥 FIRESTORE ERROR:", err);
      console.error("Create event failed:", err);
      alert("Failed to publish event. Check console.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#f8f9fa]">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border-b shadow-sm top-0 sticky">
        <button type="button" className="" onClick={handleBack}>
          ← Back
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("eventDraft");
              navigate(-1);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-event-form"
            //disabled={!isValid}
            className={`flex gap-2 px-4 py-2 rounded ${
              isValid
                ? "bg-green-500 text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Upload /> Publish
          </button>
        </div>
      </div>
      
      <form
        id="create-event-form"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto p-6 space-y-6 bg-[#f8f9fa]"
      >
        <h1 className="text-[24px]">Create a New Event</h1>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left */}
          <div className="md:col-span-2 bg-white border-2 rounded-lg p-5 space-y-4">
            <div className="flex gap-2 items-center">
              <ClipboardEdit className="text-green-500"></ClipboardEdit>
              <h3 className="font-semibold text-[24px]">Event Details</h3>
            </div>

            <label className="font-light text-[16px]">EVENT TITLE</label>
            <input
              {...register("title", { required: true })}
              placeholder="Eg, Annual Tech Fest 2025"
              className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-[16px] placeholder:font-light"
            />
           
            <label className="font-light text-[16px]">MAX ATTENDEES</label>
            <input
              type="number"
              min={1}
              {...register("attendees", {
                required: true,
                valueAsNumber: true,
              })}
              placeholder="Eg, 200"
              className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-[16px] placeholder:font-light"
            />

            <label className="font-light text-[16px]">CATEGORIES</label>
            <div className="relative">
              {/* Dropdown Trigger */}
              <div
                onClick={() => setOpen(!open)}
                className="
                  w-full border px-3 py-2 rounded bg-[#f8f9fa]
                  cursor-pointer flex justify-between items-center
                "
              >
                <span className="text-gray-500">
                  {selectedCategories.length > 0
                    ? `${selectedCategories.length} selected`
                    : "Select categories"}
                </span>
                <span>▾</span>
              </div>
              

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-sm max-h-48 overflow-y-auto">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={cat}
                        {...register("categories")}
                        
                        className="accent-green-500"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {selectedCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            <label className="font-light text-[16px]">DESCRIPTION</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe the event agenda, prerequisites and goals..."
              className="w-full border px-3 py-2 rounded min-h-[100px] bg-[#f8f9fa] text-[16px] placeholder:font-light"
            />

            {/* Highlights */}
            <div>
              <p className="text-[16px] font-light mb-2">HIGHLIGHTS</p>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`highlights.${index}`)}
                    className="w-full border px-3 py-2 rounded bg-[#f8f9fa]"
                    placeholder="Event highlight"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => append("")}
                className="text-sm text-green-600"
              >
                + Add highlight
              </button>
            </div>
          </div>

          {/* Right - Keep all other sections exactly as they were */}
          <div className="space-y-4">
            {/* Location */}
            <div className="bg-white border rounded-lg p-5 space-y-3">
              <div className="flex gap-2">
                <Building2 className="text-green-500"></Building2>
                <h3 className="font-semibold">Location</h3>
              </div>
              <label className="font-light text-[16px]">VENUE</label>
              <input
                {...register("venue", { required: true })}
                placeholder="Eg, Newton Hall"
                className="w-full text-[16px] placeholder:font-ligjt border px-3 py-2 rounded bg-[#f8f9fa]"
              />
              <label className="font-light text-[16px]">COLLEGE</label>
              <input
                {...register("college", { required: true })}
                placeholder="Eg, VIT-AP"
                className="w-full border px-3 py-2 text-[16px] font-light rounded bg-[#f8f9fa]"
              />
              <label className="font-light text-[16px]">AREA</label>
              <input
                {...register("area", { required: true })}
                placeholder="Near Secretery, Amaravathi"
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-[16px] font-light"
              />
            </div>

            {/* Time */}
            <div className="bg-white border rounded-lg p-5 space-y-3">
              <div className="flex gap-2 items-center">
                <CalendarClock className="text-green-500"></CalendarClock>
                <h3 className="font-semibold">Time</h3>
              </div>
              <label className="font-light text-[16px]">START TIME</label>
              <input
                type="date"
                {...register("startDate", { required: true })}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-gray-400 font-light"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <input
                type="time"
                {...register("startTime", { required: true })}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-gray-400 font-light"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <label className="font-light text-[16px]">END TIME</label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] font-light text-gray-400"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <input
                type="time"
                {...register("endTime", { required: true })}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] placeholder:font-light text-gray-400 font-light"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
            </div>

            {/* Upload */}
            <div className="bg-white border rounded-lg p-5 text-center">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  {...register("coverImage")}
                  id="coverImage"
                  className="hidden"
                />
                <label
                  htmlFor="coverImage"
                  className="flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="text-green-500" size={40} />
                  <p className="text-gray-500">Upload Cover Image</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white border rounded-lg p-5">
          <h3 className="font-medium text-[24px] mb-2">Feedback Form</h3>
          <p className="font-light mb-2">
            You definitely wanna hear back from the attendees, add the iframe of
            google form here
          </p>
          <input
            {...register("feedbackFormLink")}
            placeholder="Google Form link"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </form>
    </div>
  );
}