import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Eye,
  Users,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

import { listenToClubAnalytics } from "@/services/analyticsService";
import { auth } from "@/firebase/firebase";

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

const ClubAnalytics = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // IMPORTANT:
    // If your clubId is NOT user.uid,
    // replace this with clubId from Firestore user profile
    const clubId = user.uid;

    const unsubscribe = listenToClubAnalytics(clubId, (data) => {
      setStats(data);
      setEvents(data.events);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Club Analytics
        </h1>
        <p className="text-sm text-gray-500">
          Real-time performance of all your events
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarCheck}
          label="Total Events"
          value={stats?.totalEvents || 0}
        />
        <StatCard
          icon={Eye}
          label="Total Views"
          value={stats?.totalViews || 0}
        />
        <StatCard
          icon={Users}
          label="Registrations"
          value={stats?.totalRegistrations || 0}
        />
        <StatCard
          icon={TrendingUp}
          label="Conversion Rate"
          value={`${stats?.conversionRate || 0}%`}
        />
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Event Views Overview
        </h2>

        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={events}>
              <XAxis dataKey="title" hide />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="views"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            Event Performance
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-4">Event</th>
              <th className="text-left p-4">Views</th>
              <th className="text-left p-4">Registrations</th>
              <th className="text-left p-4">CTR</th>
              <th className="text-right p-4"></th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => {
              const ctr =
                event.views === 0
                  ? 0
                  : ((event.registrations / event.views) * 100).toFixed(1);

              return (
                <tr key={event.id} className="border-t">
                  <td className="p-4 font-medium text-gray-900">
                    {event.title}
                  </td>
                  <td className="p-4">{event.views}</td>
                  <td className="p-4">{event.registrations}</td>
                  <td className="p-4">{ctr}%</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        navigate(
                          `/club/events/${event.id}/analytics`
                        )
                      }
                      className="text-blue-600 hover:underline"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              );
            })}

            {events.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500"
                >
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClubAnalytics;
