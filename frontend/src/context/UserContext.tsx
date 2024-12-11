"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/dist/server/api-utils';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

interface UserData {
  name: {
    familyName: string;
    givenName: string;
  };
  emails: { value: string }[];
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

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // First check if we have a local cookie
        const userCookie = Cookies.get('user');
        if (userCookie) {
          const userData: UserData = JSON.parse(userCookie);
          console.log(userData);
          setUser(userData);
        }

        // Then verify with backend
        if (!userCookie) {
          const response = await axios.get(`${BACKEND}/api/user`, {
            withCredentials: true,
          });

          if (response.data) {
            setUser(response.data);
            // Update cookie with latest data
            Cookies.set('user', JSON.stringify(response.data));
            window.location.href = "/main";
          } else {
            setUser(null);
            Cookies.remove('user');
          }
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
        setUser(null);
        Cookies.remove('user');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

async function handleLogout() {
  try {
    const resp = await axios.delete(`${BACKEND}/auth/logout`, {
      withCredentials: true,
    });

    if (resp.data.message === "Logged out successfully") {
      Cookies.remove("user");
      Cookies.remove("connect.sid");
      window.location.href = "/main"; // Redirect client-side
    }

  } catch (error) {
    console.error("Error during logout:", error);
  }
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { handleLogout, useUser, UserProvider };