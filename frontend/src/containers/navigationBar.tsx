// components/NavigationBar.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useUser } from '@/context/UserContext';

function NavigationBar() {
  const { user, loading, error } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className="w-full sticky top-0 z-50">
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
            onClick={() => setShowMobileNav(!showMobileNav)}
            alt="list"
          />
        </div>
        <div className="flex justify-center sm:justify-start items-center">
          <a href="./">Blog</a>
        </div>
        <div className="flex items-center justify-end sm:justify-around">
          <a className="relative">
            <Image
              src={
                user?.photos[0]?.value ||
                "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
              }
              alt="profilePhoto"
              height={50}
              width={50}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="rounded-full border border-white hover:cursor-pointer"
            />
            {showProfileMenu && (
              <div
                onClick={() => {
                  window.open("/login", "_self");
                }}
                className="absolute bg-gray-500 hover:bg-gray-700 transition-colors ease-in-out duration-200 group rounded-md px-3 right-5 z-50 cursor-pointer"
              >
                {user == null ? "Login" : "Logout"}
              </div>
            )}
          </a>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {showMobileNav && (
        <div 
          className="bg-opacity-0 fixed top-0 h-full w-full"
          onClick={() => setShowMobileNav(false)}
        >
          <nav
            className={`${
              showMobileNav
                ? "translate-x-0 opacity-100 block"
                : "-translate-x-full opacity-0"
            } inset-y-0 left-0 block h-screen ease-in-out duration-300 border-2 transform fixed top-0 w-5/6 z-50 transition-all`}
            style={{
              backdropFilter: "blur(14px) saturate(100%)",
              WebkitBackdropFilter: "blur(14px) saturate(100%)",
              backgroundColor: "rgba(6, 0, 11, 0.6)",
            }}
          >
            <div className="fixed right-5 font-bold font-sans top-5 p-2 rounded-full" onClick={() => setShowMobileNav(false)}>
              X
            </div>
            <ul className="flex flex-col h-full justify-around pb-52 mt-10 text-white text-xl px-6">
              {/* Add your mobile navigation items here */}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;