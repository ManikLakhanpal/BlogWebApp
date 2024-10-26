"use client";

import axios from "axios";
import { useEffect } from "react";
import Cookies from 'js-cookie';

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
  
export default function Page() {
    useEffect(() => {
        async function fetchUserData() {
            try {
                const result = await axios.get<UserData>(`${BACKEND}/api/user`, {
                  withCredentials: true,
                });
                if (result.data) {
                  Cookies.set('user', JSON.stringify(result.data), { expires: 14 });
                } 
              } catch (error) {
                console.error("Error fetching user data:", error);
              }
        }

        setTimeout(() => {
            fetchUserData();
            window.open(`http://localhost:3000/`, "_self");
        }, 2000);

    }, []);

    return (
        <div className="text-white mt-80 text-center border-2">
            <h1>Verified Page</h1>
            <p>You are logged in!</p>
        </div>
    );
}