import Image from "next/image";

function NavigationBar() {
  const linkClasses = "relative group hidden lg:block";
  const underlineClasses =
    "absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:left-0";

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
        <a>
          <Image
            src="https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
            alt="profilePhoto"
            height={50}
            width={50}
            className="rounded-full border-2 border-black hover:cursor-pointer"
          />
        </a>
      </div>
    </nav>
  );
}

export default NavigationBar;
