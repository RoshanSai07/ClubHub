import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/firebase/firebase";

/**
 * Count event view ONLY ONCE per user
 */
export const trackEventViewOnce = async (eventId, userId) => {
  if (!eventId || !userId) return;

  const viewRef = doc(db, "events", eventId, "views", userId);
  const eventRef = doc(db, "events", eventId);

  const viewSnap = await getDoc(viewRef);

  // ❌ Already viewed → do nothing
  if (viewSnap.exists()) return;

  // ✅ First time view
  await setDoc(viewRef, {
    viewedAt: new Date(),
  });

  // 🔥 Increment analytics count
  await updateDoc(eventRef, {
    "analytics.views": increment(1),
  });
};
