// context/UserContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // ! Import the js-cookie library

const BACKEND = "http://localhost:5000";

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

// * Takes the children prop and returns the UserContext.Provider component
function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const BACKEND = "http://localhost:5000";

  // * Fetches the user data from the cookie
  useEffect(() => {
    async function fetchUserData() {
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
}

// * Logs out the user and removes the user data from the session storage
function handleLogout() {
  window.location.href = `${BACKEND}/auth/logout`;
  sessionStorage.removeItem("user");
  Cookies.remove('user'); // ! Remove the user cookie
}

/*  
  * Custom hook that returns the user context value
  * throws an error if the hook is used outside of the UserProvider
*/
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    // ! This will happen if elements are not inside UserProvider in the App component
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { handleLogout, useUser, UserProvider };