"use client"

import Image from "next/image";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

function NavProfileIcon() {
    const { user, loading, error } = useUser();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <a className="relative">
      <Image
        src={
          user == null
            ? "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
            : user.photos[0].value
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
          {user == null ? "Login" : "Logout"}
        </div>
      )}
    </a>
  );
}

export default NavProfileIcon;