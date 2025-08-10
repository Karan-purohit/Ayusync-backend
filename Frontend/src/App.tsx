import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./Features/Auth/AuthPage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/account",
      element: <AuthPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
