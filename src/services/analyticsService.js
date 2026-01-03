import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

/**
 * Real-time club analytics listener
 */
export const listenToClubAnalytics = (clubId, callback) => {
  const q = query(
    collection(db, "events"),
    where("clubId", "==", clubId)
  );

  return onSnapshot(q, (snapshot) => {
    let totalEvents = snapshot.size;
    let totalViews = 0;
    let totalRegistrations = 0;

    const events = snapshot.docs.map((doc) => {
      const data = doc.data();
      const views = data.analytics?.views || 0;
      const registrations = data.analytics?.registrations || 0;

      totalViews += views;
      totalRegistrations += registrations;

      return {
        id: doc.id,
        title: data.title,
        views,
        registrations,
      };
    });

    const conversionRate =
      totalViews === 0
        ? 0
        : ((totalRegistrations / totalViews) * 100).toFixed(1);

    callback({
      totalEvents,
      totalViews,
      totalRegistrations,
      conversionRate,
      events,
    });
  });
};
