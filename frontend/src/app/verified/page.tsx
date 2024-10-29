"use client";

import axios from "axios";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { CheckCircle } from "lucide-react";

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
        }, 3000);

    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 animate-gradient">
        <div className="max-w-md w-full sm:mx-auto mx-5">
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
            <div className="p-8">
              <div className="flex items-center justify-center mb-6">
                <CheckCircle className="text-green-400 w-16 h-16" />
              </div>
              <h1 className="text-3xl font-bold text-center text-gray-100 mb-2">Verified!</h1>
              <p className="text-center text-gray-300 mb-6">You are successfully logged in.</p>
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-400 mt-4">Redirecting you to the homepage...</p>
            </div>
          </div>
        </div>
      </div>
    );
}