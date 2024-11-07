import { useUser } from "@/context/UserContext";
import Link from "next/link";

interface Props {
  show: boolean;
  set: Function;
}

const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND;

function MobileNav(props: Props) {
  const { user, loading, error } = useUser();

  const profile = user? `${FRONTEND}/user/${user?.emails[0].value}` : `${FRONTEND}/login`
  const profileLink = user? `Profile` : `Login`;

  const routes = [
    ["Home", "/"],
    [profileLink, profile],
    ["Support", "https://www.w16manik.ninja/support-me"],
    ["About", "/"]
  ]
    return(
        <div
          className="bg-opacity-0 fixed top-0 h-full w-full z-50"
          style={{ visibility: props.show ? "visible" : "hidden" }}
          onClick={() => {
            props.set(!props.show);
          }}
        >
          <nav
            className={`${
              props.show
                ? "translate-x-0 opacity-100 block"
                : "-translate-x-full opacity-0"
            } inset-y-0 left-0 block h-screen ease-in-out duration-300 border-2 transform fixed z-50 top-0 w-5/6 transition-all`}
            style={{
              visibility: props.show ? "visible" : "hidden",
              backdropFilter: "blur(14px) saturate(100%)",
              WebkitBackdropFilter: "blur(14px) saturate(100%)",
              backgroundColor: "rgba(6, 0, 11, 0.6)",
            }}
          >
            <div
              className="fixed right-5 text-white font-bold font-sans top-5 p-2 rounded-full"
              onClick={() => {
                props.set(false);
              }}
            >
              X
            </div>
            <ul className="flex flex-col h-full justify-around pb-52 mt-10 text-white text-xl px-6">
              {routes.map(([name, path], index) => (
                <li key={index}>
                <Link href={`${path}`} onClick={() => props.set(false)}>
                  {name}
                </Link>
              </li>
              ))}
            </ul>
          </nav>
        </div>
    );
}

export default MobileNav;