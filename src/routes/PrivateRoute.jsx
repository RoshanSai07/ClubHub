// // import { Navigate } from "react-router-dom";

// // const isAuthenticated = () => {
// //   return localStorage.getItem("isLoggedIn") === "true";
// // };

// // export default function PrivateRoute({ children }) {
// //   if (!isAuthenticated()) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   return children;
// // }
// import React from 'react'

// const PrivateRoute = ({children}) => {
//   return (
//     children
//   )
// }

// export default PrivateRoute


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getUserById } from "@/firebase/collections";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFirebaseUser(null);
        setLoading(false);
        return;
      }

      setFirebaseUser(user);

      const data = await getUserById(user.uid);
      setUserDoc(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  //  Not logged in
  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  //  Logged in but no user doc
  if (!userDoc) {
    return <Navigate to="/signup" replace />;
  }

  //  Club but not approved
  if (userDoc.role === "CLUB" && userDoc.isApproved === false) {
    return <Navigate to="/waiting-approval" replace />;
  }

  //  Allowed
  return children;
};

export default PrivateRoute;
