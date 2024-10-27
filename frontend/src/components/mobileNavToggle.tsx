import Image from "next/image";
import { useState } from "react";

function MobileNavToggle() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
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
  );
}
