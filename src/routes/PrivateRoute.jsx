// import { Navigate } from "react-router-dom";

// const isAuthenticated = () => {
//   return localStorage.getItem("isLoggedIn") === "true";
// };

// export default function PrivateRoute({ children }) {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }
import React from 'react'

const PrivateRoute = ({children}) => {
  return (
    children
  )
}

export default PrivateRoute
