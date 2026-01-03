import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Eye,
  Users,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
    <div className="p-3 bg-blue-50 rounded-lg">
      <Icon className="text-blue-600" size={22} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const EventAnalytics = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    const ref = doc(db, "events", eventId);

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setEvent({ id: snap.id, ...snap.data() });
      }
    });

    return () => unsubscribe();
  }, [eventId]);

  if (!event) {
    return (
      <div className="p-6 text-gray-500">
        Loading event analytics...
      </div>
    );
  }

  const views = event.analytics?.views || 0;
  const registrations = event.analytics?.registrations || 0;
  const ctr =
    views === 0 ? 0 : ((registrations / views) * 100).toFixed(1);

  // Simple chart data (can be expanded later)
  const chartData = [
    { name: "Views", value: views },
    { name: "Registrations", value: registrations },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <ArrowLeft size={16} />
        Back to Club Analytics
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {event.title}
        </h1>
        <p className="text-sm text-gray-500">
          Detailed performance insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Eye} label="Views" value={views} />
        <StatCard
          icon={Users}
          label="Registrations"
          value={registrations}
        />
        <StatCard
          icon={TrendingUp}
          label="Conversion Rate"
          value={`${ctr}%`}
        />
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Engagement Overview
        </h2>

        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-3">
          Event Info
        </h2>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <span className="font-medium">Status:</span>{" "}
            {event.status || "N/A"}
          </p>
          <p>
            <span className="font-medium">Created At:</span>{" "}
            {event.createdAt?.toDate
              ? event.createdAt.toDate().toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;
