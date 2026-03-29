import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/UseAuth";


const Protected = ({ children }) => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  // Show loading while auth state is being checked
  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }

  // Redirect to login if not logged in
  if (!user) {
   return<navigate to ={"/login"}/>; // you can also use <Navigate /> from react-router
    return null;
  }

  // Render protected content
  return children ;
};

export default Protected;