import { useEffect, useState } from "react";
import { getClubAnalytics } from "@/firebase/collections";
import { auth } from "@/firebase/firebase";

const ClubAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const clubId = auth.currentUser.uid;
      const data = await getClubAnalytics(clubId);
      setStats(data);
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p className="p-6">Loading analytics...</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Club Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat label="Total Views" value={stats.totalViews} />
        <Stat label="Total Clicks" value={stats.totalClicks} />
        <Stat label="Total Registrations" value={stats.totalRegistrations} />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default ClubAnalytics;
