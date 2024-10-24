"use client"; // Ensure client-side rendering

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoogleImage, GoogleText } from "@/components/Google";
import { GitHubImage, GitHubText } from "@/components/GitHub";

// Define an interface for the user data
interface UserData {
  name: {
    familyName: string;
    givenName: string;
  };

  displayName: string;

  photos: { value: string }[];

  provider: string;
}

export default function Home() {
  // State variables for the data, loading, and error
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signInMethod, setSignInMethod] = useState<string | null>(null);

  const BACKEND = "http://localhost:5000";

  useEffect(() => {
    // Fetch data from your backend
    async function fetchData() {
      try {
        const result = await axios.get<UserData>(
          `${BACKEND}/api/user`,
          {
            withCredentials: true, // Ensure credentials (like session cookies) are sent
          },
        );
        setSignInMethod(result.data.provider);
        setData(result.data); // Set the response data
      } catch (error: unknown) {
        console.error("Error fetching data:", error); // Handle errors
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the async function on mount
  }, [BACKEND]);

  // Google Sign In function
  function handleGoogleSignIn() {
    const googleAuthUrl = `${BACKEND}/auth/google`;
    if (googleAuthUrl.startsWith("https://")) {
      window.open(googleAuthUrl, "_self");
    } else {
      console.error("Insecure URL detected. HTTPS is required.");
    }
  }
  
  // GitHub Sign In function
  function handelGitHubSignIn() {
    const githubAuthUrl = `${BACKEND}/auth/github`;
    if (githubAuthUrl.startsWith("https://")) {
      window.open(githubAuthUrl, "_self");
    } else {
      console.error("Insecure URL detected. HTTPS is required.");
    }
  }

  return (
    <div className="bg-slate-900 h-screen flex flex-col">
      <div className="flex justify-center items-center flex-col h-full border-4 border-red-500 grow">
        {!data && (
          <Image
            src={"https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"}
            height={150}
            width={150}
            alt="Luffy"
            className="rounded-full border-2"
          />
        )}
        {(data && signInMethod == "google") && (
          <div className="flex flex-col justify-center items-center">
            <GoogleImage name={null} photos={data.photos[0].value} />
            <GoogleText name={`${data.name.givenName} ${data.name.familyName}`} photos={null} />
          </div>
        )}
        {(data && signInMethod == "github") && (
          <div className="flex flex-col justify-center items-center">
            <GitHubImage name={null} photos={data.photos[0].value} />
            <GitHubText name={data.displayName} photos={null} />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!data && !loading && (
          <div className="flex flex-col">
            <button
              className="mt-5 px-6 py-2 bg-blue-500 text-white font-bold rounded transition-colors hover:bg-blue-800"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
            <button
              className="mt-5 px-6 py-2 bg-gray-500 text-white font-bold rounded transition-colors hover:bg-gray-800"
              onClick={handelGitHubSignIn}
            >
              Sign in with GitHub
            </button>
          </div>
        )}
        {data && !loading && (
          <button
            className="mt-5 px-6 py-2 bg-red-500 text-black font-bold rounded"
            onClick={() => {
              setSignInMethod(null);
              window.location.href = `${BACKEND}/auth/logout`
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
