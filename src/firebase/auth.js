import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "./config";

const getRoleFromEmail = (email) => {
  if (email.endsWith("@student.college.edu")) return "student";
  if (email.endsWith("@club.college.edu")) return "club";
  return "admin"; 
};

export const googleSignIn = async () =>{
    try{
        const result = await signInWithPopup(auth, googleProvider);
        const user =  result.user;
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if(!snap.exists()){
            const role = getRoleFromEmail(user.email);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                role,
                createdAt: Date.now(),
            });
            return {...user, role};
        }
        return {...user, role: snap.data().role};
    }catch (error){
        console.error("Google sign in error: ", error);
        throw error;
    }
}