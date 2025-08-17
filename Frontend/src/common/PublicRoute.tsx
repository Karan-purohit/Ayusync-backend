import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <Navigate
        to={user.isProfileComplete ? "/dashboard" : "/profile"}
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;
