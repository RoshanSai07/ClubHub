import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Mail } from "lucide-react";

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "";

  const date = timestamp.toDate();
  const seconds = Math.floor((new Date() - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};


const ClubInfo = () => {
  const [clubs, setClubs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [announcementFilter, setAnnouncementFilter] = useState("ALL");

  /* ---------------- FETCH CLUBS ---------------- */
  useEffect(() => {
    const fetchClubs = async () => {
      const snap = await getDocs(collection(db, "clubs"));

      const data = snap.docs.map((doc) => {
        const club = doc.data();

        return {
          id: doc.id,
          clubName: club.clubName,
          description: club.about || club.description || "",
          email: club.email,
          category: club.category?.[0] || "Category",
          avatar: club.avatar,
          hiringOpen: club.hiringOpen === true,
          gFormLink: club.gFormLink,
        };
      });

      setClubs(data);
    };

    fetchClubs();
  }, []);

  /* ---------------- FETCH ANNOUNCEMENTS ---------------- */
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const snap = await getDocs(collection(db, "announcements"));

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAnnouncements(data);
    };

    fetchAnnouncements();
  }, []);
  const filteredAnnouncements = announcements.filter((a) => {
    if (!a.createdAt) return false;

    const created = a.createdAt.toDate();
    const now = new Date();

    if (announcementFilter === "ALL") return true;

    if (announcementFilter === "WEEK") {
      return now - created <= 7 * 24 * 60 * 60 * 1000;
    }

    if (announcementFilter === "MONTH") {
      return now - created <= 30 * 24 * 60 * 60 * 1000;
    }

    if (announcementFilter === "OLDER") {
      return now - created > 30 * 24 * 60 * 60 * 1000;
    }

    return true;
  });

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredClubs =
    filter === "ALL"
      ? clubs
      : filter === "OPEN"
      ? clubs.filter((c) => c.hiringOpen)
      : clubs.filter((c) => !c.hiringOpen);

  return (
    <div className="p-6 space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">Club Hiring & Contact</h1>
        <p className="text-gray-500 text-sm">
          Explore active student organizations, view recruitment status and connect with club leaders
        </p>
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex gap-3">
        {[
          { key: "ALL", label: "All" },
          { key: "OPEN", label: "Hiring Open" },
          { key: "CLOSED", label: "Closed" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`px-4 py-1 rounded-full text-sm border ${
              filter === item.key
                ? "bg-yellow-400 text-black"
                : "bg-white text-gray-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= CLUB CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white border rounded-xl p-4 shadow-sm space-y-3"
          >
            {/* STATUS */}
            <span
              className={`text-xs px-3 py-1 rounded-full inline-block ${
                club.hiringOpen
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {club.hiringOpen ? "Hiring Open" : "Closed"}
            </span>

            {/* CLUB HEADER (LOGO + NAME) */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {club.avatar ? (
                  <img
                    src={club.avatar}
                    alt={club.clubName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">Logo</span>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-base">
                  {club.clubName}
                </h3>
                <span className="text-xs text-blue-600">
                  {club.category}
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-500 line-clamp-2">
              {club.description || "No description provided"}
            </p>

            {/* FOOTER */}
            <div className="flex items-center justify-between pt-2 border-t">
              {club.hiringOpen ? (
                <button
                  onClick={() =>
                    window.open(club.gFormLink, "_blank")
                  }
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-500"
                >
                  Apply
                </button>
              ) : (
                <span className="text-sm text-gray-400">
                  Applications Closed
                </span>
              )}

              <a href={`mailto:${club.email}`}>
                <Mail className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ANNOUNCEMENTS ================= */}
      {/* FILTER BAR */}
      <div className="flex gap-2 mb-2">
        {[
          { label: "All", value: "ALL" },
          { label: "This Week", value: "WEEK" },
          { label: "This Month", value: "MONTH" },
          { label: "Older", value: "OLDER" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setAnnouncementFilter(f.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition
              ${
                announcementFilter === f.value
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Club Announcements</h2>

        {announcements.length === 0 && (
          <div className="bg-white border rounded-xl p-4 text-sm text-gray-500">
            No announcements yet
          </div>
        )}

        {filteredAnnouncements.map((a) => (
          <div
            key={a.id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow transition"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                {a.clubName}
              </p>

              <span className="text-xs text-gray-400">
                {formatTimeAgo(a.createdAt)}
              </span>
            </div>

            {/* MESSAGE */}
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
              {a.message}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ClubInfo;
