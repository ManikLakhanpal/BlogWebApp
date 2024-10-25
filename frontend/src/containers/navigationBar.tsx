"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface UserData {
  name: {
    familyName: string;
    givenName: string;
  };
  displayName: string;
  photos: { value: string }[];
  provider: string;
}

function NavigationBar() {
  const linkClasses = "relative group hidden lg:block";
  const underlineClasses =
    "absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:left-0";

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signInMethod, setSignInMethod] = useState<string | null>(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const BACKEND = "http://localhost:5000";

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get<UserData>(`${BACKEND}/api/user`, {
          withCredentials: true,
        });
        if (result.data != null) {
          setSignInMethod(result.data.provider);
          setData(result.data);
          sessionStorage.setItem("userData", JSON.stringify(result.data));
        }
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [BACKEND]);

  return (
    <div className="w-full sticky top-0">
      
        <div>
          <nav
            style={{
              backdropFilter: "blur(14px) saturate(100%)",
              WebkitBackdropFilter: "blur(14px) saturate(100%)",
              backgroundColor: "rgba(6, 0, 11, 0.6)",
            }}
            className="grid grid-cols-3 sm:grid-cols-2 text-white w-full py-4 text-xl px-9 z-40"
          >
            <div className="flex sm:hidden items-center">
              <Image
                src="https://w16manik.blr1.cdn.digitaloceanspaces.com/elements/list.svg"
                height={30}
                width={30}
                onClick={() => {
                  setShowMobileNav(!showMobileNav);
                }}
                alt="list"
              />
            </div>
            <div className="flex justify-center sm:justify-start items-center">
              <a href="./">Blog</a>
            </div>
            <div className="flex items-center justify-end sm:justify-around">
              <div className={linkClasses}>
                <a href="./#home">Home</a>
                <div className={underlineClasses}></div>
              </div>
              <div className={linkClasses}>
                <a href="./#about">Latest</a>
                <div className={underlineClasses}></div>
              </div>
              <div className={linkClasses}>
                <a href="./#projects">Trending</a>
                <div className={underlineClasses}></div>
              </div>
              <a className="relative">
                <Image
                  src={
                    data == null
                      ? "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
                      : data.photos[0].value
                  }
                  alt="profilePhoto"
                  height={50}
                  width={50}
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                  }}
                  className="rounded-full border border-white hover:cursor-pointer"
                />
                {showProfileMenu && (
                  <div
                    onClick={() => {
                      window.open("/login", "_self");
                    }}
                    className="absolute bg-gray-500 hover:bg-gray-700 transition-colors ease-in-out duration-200 group rounded-md px-3 right-5 z-50 cursor-pointer"
                  >
                    {data == null ? "Login" : "Logout"}
                  </div>
                )}
              </a>
            </div>
          </nav>
        </div>
      

      {/* MOBILE NAV BELOW */}
      {showMobileNav && (
        <div 
          className="bg-opacity-0 fixed top-0 h-full w-full"
          onClick={() => {setShowMobileNav(!showMobileNav)}}
        >
          <nav
            className={`${
              showMobileNav
                ? "translate-x-0 opacity-100 block"
                : "-translate-x-full opacity-0"
            } inset-y-0 left-0 block h-screen ease-in-out duration-300 border-2 transform fixed top-0 w-5/6 z-50 transition-all`}
            style={{
              visibility: showMobileNav ? "visible" : "hidden",
              backdropFilter: "blur(14px) saturate(100%)",
              WebkitBackdropFilter: "blur(14px) saturate(100%)",
              backgroundColor: "rgba(6, 0, 11, 0.6)",
            }}
          >
            <div
              className="fixed right-5 font-bold font-sans top-5 p-2 rounded-full"
              onClick={() => {
                setShowMobileNav(false);
              }}
            >
              X
            </div>
            <ul className="flex flex-col h-full justify-around pb-52 mt-10 text-white text-xl px-6">
              <li>
                <a href="./#home" onClick={() => setShowMobileNav(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="./#about" onClick={() => setShowMobileNav(false)}>
                  Latest
                </a>
              </li>
              <li>
                <a href="./#projects" onClick={() => setShowMobileNav(false)}>
                  Trending
                </a>
              </li>
              <li>
                <a href="./contact" onClick={() => setShowMobileNav(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
