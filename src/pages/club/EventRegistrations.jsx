import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById, getStudentById } from "@/firebase/collections";

const EventRegistrations = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const eventData = await getEventById(eventId);
      if (!eventData) return;

      setEvent(eventData);

      const users = await Promise.all(
        (eventData.registeredUsers || []).map((uid) =>
          getStudentById(uid)
        )
      );

      setStudents(users.filter(Boolean));
      setLoading(false);
    };

    fetchRegistrations();
  }, [eventId]);

  if (loading) return <p className="p-6">Loading registrations...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Registrations — {event.title}
      </h1>

      {students.length === 0 ? (
        <p className="text-gray-500">No students registered yet.</p>
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium flex items-center gap-3">
                    <img
                      src={s.avatar || s.profile?.photoURL}
                      className="w-8 h-8 rounded-full"
                    />
                    {s.fullName || s.profile?.displayName}
                  </td>
                  <td className="p-3">{s.profile?.email}</td>
                  <td className="p-3">{s.phone || s.profile?.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;