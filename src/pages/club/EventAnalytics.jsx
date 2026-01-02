import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const EventAnalytics = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("Analytics Event ID:", id);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const snap = await getDoc(doc(db, "events", id));
      if (snap.exists()) {
        setEvent({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, [id]);

  if (loading) return <p>Loading analytics...</p>;
  if (!event) return <p>Event not found</p>;

  const analytics = event.analytics || {
    views: 0,
    clicks: 0,
    registrations: 0,
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Analytics – {event.title}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Views" value={analytics.views} />
        <StatCard label="Clicks" value={analytics.clicks} />
        <StatCard label="Registrations" value={analytics.registrations} />
      </div>

      {/* Extra Info */}
      <div className="mt-8 bg-white p-6 rounded border">
        <p><strong>Status:</strong> {event.status}</p>
        <p>
          <strong>Registered Users:</strong>{" "}
          {event.registeredUsers?.length || 0}
        </p>
      </div>
    </div>
  );
};

export default EventAnalytics;
