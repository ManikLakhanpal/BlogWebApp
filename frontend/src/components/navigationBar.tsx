"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface UserData {
  name: {
    familyName: string
    givenName: string
  }
  displayName: string
  photos: { value: string }[]
  provider: string
}

function NavigationBar() {
  const linkClasses = "relative group hidden lg:block";
  const underlineClasses = "absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:left-0";
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND = "http://localhost:5000"

  useEffect(() => {
    async function fetchData() {
        try {
          const result = await axios.get<UserData>(`${BACKEND}/api/user`, {
            withCredentials: true,
          })
          if (result.data != null) {
            setData(result.data)
            sessionStorage.setItem("userData", JSON.stringify(result.data))
          }
        } catch (error: unknown) {
          console.error("Error fetching data:", error)
          setError("Failed to fetch user data.")
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [BACKEND])

  return (
    <nav
      className="grid grid-cols-2 text-white w-screen py-4 text-xl px-9 sticky h-full z-50"
      style={{
        backdropFilter: "blur(14px) saturate(100%)",
        WebkitBackdropFilter: "blur(14px) saturate(100%)",
        backgroundColor: "rgba(6, 0, 11, 0.6)",
      }}
    >
      <div className="flex items-center">
        <a href="./">
          Blog
        </a>
      </div>
      <div className="flex items-center justify-around">
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
        <a className="relative inline-block">
          <Image
            src={(data?.photos[0].value) ? `${data.photos[0].value}` : "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"}
            alt="profilePhoto"
            height={50}
            width={50}
            onClick={() => {setShowProfileMenu(!showProfileMenu)}}
            className="rounded-full border border-white hover:cursor-pointer"
          />

          {showProfileMenu && (
            <div 
              onClick={() => {window.open("/login", "_self")}}
              className="absolute bg-orange-400 group rounded-md px-3 right-5 z-50 duration-300 cursor-pointer transition-colors hover:bg-orange-500"
            >
              {data == null ? "Login" : "Logout"}
            </div>
          )}
        </a>
      </div>
    </nav>
  );
}

export default NavigationBar;
