import {
  useContext,
  useState,
  useEffect,
  createContext,
  type ReactNode,
} from "react";

import type { User } from "../types/User";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (user: User | null) => user,
  setLoading: (loading: boolean) => loading,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const user = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        credentials: "include",
      });
      const response = await user.json();
      if (response.error) {
        throw new Error(response.error);
      }
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
