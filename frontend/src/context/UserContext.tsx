// context/UserContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface UserData {
  name: {
    familyName: string;
    givenName: string;
  };
  displayName: string;
  photos: { value: string }[];
  provider: string;
}

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const BACKEND = "http://localhost:5000";

  useEffect(() => {
    const fetchUserData = async () => {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        try {
          const userData: UserData = JSON.parse(userCookie);
          setUser(userData);
        } catch (error) {
          console.error("Error parsing user cookie:", error);
          setError("Failed to parse user data.");
          setUser(null);
        }
      } else {
        try {
          const result = await axios.get<UserData>(`${BACKEND}/api/user`, {
            withCredentials: true,
          });
          if (result.data) {
            setUser(result.data);
            Cookies.set('user', JSON.stringify(result.data), { expires: 14 });
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data.");
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [BACKEND]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};