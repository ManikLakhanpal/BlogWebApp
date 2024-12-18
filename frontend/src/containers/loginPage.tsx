"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleImage, GoogleText } from "@/components/Google";
import { GitHubImage, GitHubText } from "@/components/GitHub";
import { ArrowLeft, Loader2, LogOut } from "lucide-react";
import { useUser, handleLogout as logout } from "@/context/UserContext";

interface UserData {
  name: {
    familyName: string;
    givenName: string;
  };
  displayName: string;
  photos: { value: string }[];
  provider: string;
}

function LoginPage() {
  const { user, loading, error } = useUser();
  const [data, setData] = useState<UserData | null>(null);
  const [signInMethod, setSignInMethod] = useState<string | null>(null);

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

  useEffect(() => {
    if (user) {
      setData(user);
      setSignInMethod(user.provider);
    }
  }, [user]);

  function handleGoogleSignIn() {
    window.open(`${BACKEND}/auth/google`, "_self");
  }

  function handleGitHubSignIn() {
    window.open(`${BACKEND}/auth/github`, "_self");
  }

  function handleLogout() {
    setSignInMethod(null);
    logout();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <Link href="/main" className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors duration-300">
        <ArrowLeft className="w-6 h-6" />
        <span className="sr-only">Back to Home</span>
      </Link>
      <div className="w-full max-w-md">
        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : data ? (
              <div className="text-center">
                {signInMethod === "google" && (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <GoogleImage name={null} photos={data.photos[0].value} />
                      <GoogleText
                        name={`${data.name.givenName} ${data.name.familyName}`}
                        photos={null}
                      />
                    </div>
                  </div>
                )}
                {signInMethod === "github" && (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <GitHubImage name={null} photos={data.photos[0].value} />
                      <GitHubText name={data.displayName} photos={null} />
                    </div>
                  </div>
                )}
                <button
                  className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <Image
                    src="https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
                    height={120}
                    width={120}
                    alt="Luffy"
                    className="rounded-full border-4 border-gray-700 mx-auto"
                  />
                  <h2 className="mt-4 text-2xl font-bold text-white">
                    Welcome to Blog
                  </h2>
                  <p className="mt-2 text-gray-400">Sign in to continue</p>
                </div>
                <div className="space-y-4">
                  <button
                    className="w-full px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-500 hover:text-white transition-colors duration-300 flex items-center justify-center"
                    onClick={handleGoogleSignIn}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                  <button
                    className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-300 hover:text-black transition-colors duration-300 flex items-center justify-center"
                    onClick={handleGitHubSignIn}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      />
                    </svg>
                    Sign in with GitHub
                  </button>
                </div>
              </div>
            )}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;