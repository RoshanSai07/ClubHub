import { db } from "@/firebase/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const saveAcademicSchedule = async ({
  userId,
  timetable,
  sourceImageURL,
}) => {
  const ref = doc(db, "academicSchedules", userId);

  await setDoc(ref, {
    userId,
    sourceImageURL,
    timetable,
    status: "completed",
    extractedAt: serverTimestamp(),
  });
};

export const getAcademicSchedule = async (userId) => {
  if (!userId) return null;

  const ref = doc(db, "academicSchedules", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};
