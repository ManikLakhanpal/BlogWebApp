import NavProfileIcon from "./navProfileIcon";

function NavigationBarLinks() {
  const linkClasses = "relative group hidden lg:block";
  const underlineClasses =
    "absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:left-0";

  const routes = ["Home", "Profile", "About"];
  return (
    <div className="flex items-center justify-end sm:justify-around">
      {routes.map((val, index) => (
        <div key={index} className={linkClasses}>
          <a href={`./${val}`}>{val}</a>
          <div className={underlineClasses}></div>
        </div>
      ))}
      <NavProfileIcon />
    </div>
  );
}

export default NavigationBarLinks;
