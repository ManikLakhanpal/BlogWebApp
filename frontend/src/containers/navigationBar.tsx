"use client"

import NavigationBarLinks from "@/components/navigationBarLinks";
import MobileNavToggle from "@/components/mobileNavToggle";
import { useState } from "react";

function NavigationBar() {
  const [showMobileNav, setShowMobileNav] = useState(false);

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
          <MobileNavToggle
            onClick={() => {
              setShowMobileNav(!showMobileNav);
            }}
           />
          <div className="flex flex-row justify-center sm:justify-start items-center">
            <a href="./">Blog</a>
          </div>  
            <NavigationBarLinks />
        </nav>
      </div>

      {setTimeout(() => {
        showMobileNav;
      }, 300) && (
        <div
          className="bg-opacity-0 fixed top-0 h-full w-full"
          style={{ visibility: showMobileNav ? "visible" : "hidden" }}
          onClick={() => {
            setShowMobileNav(!showMobileNav);
          }}
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
              className="fixed right-5 text-white font-bold font-sans top-5 p-2 rounded-full"
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