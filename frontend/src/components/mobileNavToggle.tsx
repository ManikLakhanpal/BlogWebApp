"use client";

import Image from "next/image";

interface MobileNavToggleProps {
  onClick: () => void;
}

function MobileNavToggle({ onClick }: MobileNavToggleProps) {
  return (
    <div className="flex sm:hidden items-center" onClick={onClick}>
      <Image
        src="https://w16manik.blr1.cdn.digitaloceanspaces.com/elements/list.svg"
        height={30}
        width={30}
        alt="list"
      />
    </div>
  );
}

export default MobileNavToggle;