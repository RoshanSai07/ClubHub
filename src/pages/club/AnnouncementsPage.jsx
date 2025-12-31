import { useState , useEffect} from "react";
import {auth} from "@/firebase/firebase";
import { createAnnouncement, updateAnnouncement, deleteAnnouncement, getClubAnnouncements } from "@/firebase/collections";
import { getClubById } from "@/firebase/collections";
import { serverTimestamp } from "firebase/firestore";


const formatDateTime = (timestamp) => {
  if (!timestamp) return "";

  const date = timestamp.toDate(); // 🔑 Firestore → JS Date

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draftSearch, setDraftSearch] = useState("");
  const [pastSearch, setPastSearch] = useState("");
  const [activeTab, setActiveTab] = useState("create");
  const [club, setClub] = useState(null);


  useEffect(()=>{
    const fetchAnnouncements = async () =>{
      const user = auth.currentUser;
      
      if(!user) return;
      const clubdata = await getClubById(user.uid);
      const data = await getClubAnnouncements(user.uid);
      setAnnouncements(data);
      setClub(clubdata);

    };
    fetchAnnouncements();
  }, []);
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "All Members",
  });

  const handleEditDraft = (draft) => {
    setForm({
      title: draft.title,
      message: draft.message,
      audience: draft.audience,
    });
    setEditingId(draft.id);
    setActiveTab("create");
  };

  const handleDeleteDraft = async (id) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const saveAnnouncement = async (status) => {
    if (!form.title.trim() || !form.message.trim()) {
      alert("Please fill in both title and message");
      return;
    }
    const user = auth.currentUser;
    if(!user) return;
    const payload = {
      clubId: user.uid,
      clubName: club.clubName,
      title: form.title,
      message: form.message,
      audience: form.audience,
      createdAt: serverTimestamp(),
      status,
      ...(status === "SENT" && { recipients: Math.floor(Math.random() * 200) + 50 })
    };
    try{
      if (editingId) {
        await updateAnnouncement(editingId, payload);
        setAnnouncements(prev => 
          prev.map(a => a.id === editingId ? newAnnouncement : a)
        );
      } else {
        const docRef = await createAnnouncement(user.uid, payload);
        setAnnouncements((prev) =>[
          {id: docRef.id, ...payload},
          ...prev,
        ]);
      }

      setForm({
        title: "",
        message: "",
        audience: "All Members",
      });
      setEditingId(null);
    }catch(err){
      console.error("Announcement save failed", err);
      alert("Failed to save announcement");
    }
  };

  const drafts = announcements.filter(
    a => a.status === "DRAFT" &&
    (a.title.toLowerCase().includes(draftSearch.toLowerCase()) ||
     a.message.toLowerCase().includes(draftSearch.toLowerCase()))
  );

  const sent = announcements.filter(
    a => a.status === "SENT" &&
    (a.title.toLowerCase().includes(pastSearch.toLowerCase()) ||
     a.message.toLowerCase().includes(pastSearch.toLowerCase()))
  );

  const charCount = form.message.length;
  const maxChars = 500;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <span className="material-symbols-outlined text-white text-2xl">
                campaign
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
              <p className="text-gray-600 mt-1">
                Manage and send updates to your club members, keep everyone informed about upcoming events
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mt-6">
            <button
              onClick={() => setActiveTab("create")}
              className={`px-4 py-3 font-medium text-sm transition-all ${
                activeTab === "create"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="material-symbols-outlined align-middle mr-2 text-base">
                edit_note
              </span>
              Create Announcement
            </button>
            <button
              onClick={() => setActiveTab("drafts")}
              className={`px-4 py-3 font-medium text-sm transition-all ${
                activeTab === "drafts"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="material-symbols-outlined align-middle mr-2 text-base">
                draft
              </span>
              Drafts ({drafts.length})
            </button>
            <button
              onClick={() => setActiveTab("sent")}
              className={`px-4 py-3 font-medium text-sm transition-all ${
                activeTab === "sent"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="material-symbols-outlined align-middle mr-2 text-base">
                send
              </span>
              Sent ({sent.length})
            </button>
          </div>
        </header>

        {/* Create Announcement Tab */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="material-symbols-outlined text-blue-600">
                  edit_note
                </span>
              </div>
              <div>
                <h2 className="font-semibold text-xl text-gray-900">
                  {editingId ? "Edit Draft" : "Create New Announcement"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {editingId 
                    ? "Update your announcement draft" 
                    : "Compose a new message for your club members"
                  }
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Announcement Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Hackathon Registration Now Open"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audience
                  </label>
                  <select
                    name="audience"
                    value={form.audience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="All Members">All Members</option>
                    <option value="Core Team">Core Team</option>
                    <option value="New Members">New Members</option>
                    <option value="Event Participants">Event Participants</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <span className={`text-sm ${charCount > maxChars ? 'text-red-600' : 'text-gray-500'}`}>
                    {charCount}/{maxChars}
                  </span>
                </div>
                <textarea
                  name="message"
                  placeholder="Write your announcement details here... Be clear and concise for better engagement."
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  maxLength={maxChars}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none bg-white ${
                    charCount > maxChars ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {charCount > maxChars && (
                  <p className="text-red-600 text-sm mt-2">
                    Message exceeds character limit
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  {editingId ? "Editing draft • " : "New announcement • "}
                  {form.audience}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setForm({ title: "", message: "", audience: "All Members" });
                      setEditingId(null);
                    }}
                    className="px-5 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => saveAnnouncement("DRAFT")}
                    className="px-5 py-2.5 border border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    onClick={() => saveAnnouncement("SENT")}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <span className="material-symbols-outlined align-middle mr-2 text-sm">
                      send
                    </span>
                    Send Announcement
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drafts Tab */}
        {activeTab === "drafts" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="font-semibold text-xl text-gray-900">Draft Announcements</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {drafts.length} draft{drafts.length !== 1 ? 's' : ''} pending
                  </p>
                </div>
                <div className="relative w-full md:w-auto">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search drafts..."
                    value={draftSearch}
                    onChange={(e) => setDraftSearch(e.target.value)}
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                  />
                </div>
              </div>

              {drafts.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">
                    draft
                  </span>
                  <h3 className="font-medium text-gray-700 mb-1">No drafts available</h3>
                  <p className="text-gray-500 text-sm">Start creating your first announcement</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {drafts.map((draft) => (
                    <div key={draft.id} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all hover:shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{draft.title}</h3>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              DRAFT
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">
                                group
                              </span>
                              {draft.audience}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">
                                schedule
                              </span>
                              Last edited {formatDateTime(draft.updatedAt || draft.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditDraft(draft)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit draft"
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteDraft(draft.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete draft"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{draft.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sent Announcements Tab */}
        {activeTab === "sent" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="font-semibold text-xl text-gray-900">Sent Announcements</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {sent.length} announcement{sent.length !== 1 ? 's' : ''} sent
                  </p>
                </div>
                <div className="relative w-full md:w-auto">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search sent announcements..."
                    value={pastSearch}
                    onChange={(e) => setPastSearch(e.target.value)}
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                  />
                </div>
              </div>

              {sent.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">
                    send
                  </span>
                  <h3 className="font-medium text-gray-700 mb-1">No announcements sent yet</h3>
                  <p className="text-gray-500 text-sm">Send your first announcement to club members</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sent.map((announcement) => (
                    <div key={announcement.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              SENT
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">
                                group
                              </span>
                              {announcement.audience}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">
                                schedule
                              </span>
                              Sent {formatDateTime(announcement.createdAt)}
                            </span>
                            {announcement.recipients && (
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">
                                  person
                                </span>
                                {announcement.recipients} recipients
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{announcement.message}</p>
                      <div className="flex gap-3 text-sm">
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                          <span className="material-symbols-outlined text-base">
                            visibility
                          </span>
                          View Details
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700">
                          <span className="material-symbols-outlined text-base">
                            content_copy
                          </span>
                          Copy
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700">
                          <span className="material-symbols-outlined text-base">
                            analytics
                          </span>
                          Analytics
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;