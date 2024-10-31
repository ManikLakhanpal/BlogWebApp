"use client"

import NavigationBarLinks from "../components/NavigationBarLinks";
import MobileNavToggle from "../components/MobileNavToggle";
import MobileNav from "../components/MobileNav";
import { useState } from "react";

function NavigationBar() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className="w-full sticky top-0 z-50">
      <div>
        <nav
          style={{
            backdropFilter: "blur(14px) saturate(100%)",
            WebkitBackdropFilter: "blur(14px) saturate(100%)",
            backgroundColor: "rgba(3, 3, 32, 0.6)",
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
        <MobileNav 
          show={showMobileNav}
          set={setShowMobileNav}
        />
      )}
    </div>
  );
}

export default NavigationBar;