import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  requireProfileComplete = false,
}: {
  children: ReactNode;
  requireProfileComplete?: boolean;
}) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/account" replace />;

  if (requireProfileComplete && !user.isProfileComplete) {
    return <Navigate to="/profile" replace />;
  }

  if (!requireProfileComplete && user.isProfileComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
