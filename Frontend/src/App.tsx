import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AuthPage from "./features/auth/AuthPage";
import CompleteUserProfile from "./features/profile/CompleteUserProfile";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./common/PublicRoute";
import ProtectedRoute from "./common/ProtectedRoute";
import { Dashboard } from "./features/dashboard/Dashboard";
import UpdateProfile from "./features/dashboard/components/UpdateProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/account" replace />,
    },
    {
      path: "/account",
      element: (
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <CompleteUserProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute requireProfileComplete>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [{ path: "profile", element: <UpdateProfile /> }],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
