import { Home, Bell, Mail, User } from "lucide-react";
import Link from "next/link";

interface User {
    emails: { value: string }[];
}

interface Props {
    user: User | null;
    setShowCreate: Function;
}

const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND;

function LeftSideBar(props: Props) {
    return (
        <nav className="hidden text-white sm:block w-1/4 max-w-xs fixed left-0 bg-opacity-10 rounded-lg bg-gray-900 h-fit p-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/main"
              className="flex items-center space-x-4 text-xl transition-colors duration-75 hover:bg-gray-800 rounded-xl p-3"
            >
              <Home />
              <span>Home</span>
            </Link>
            <Link
              href="/main"
              className="flex items-center space-x-4 text-xl transition-colors duration-75 hover:bg-gray-800 rounded-xl p-3"
            >
              <Bell />
              <span>Notifications</span>
            </Link>
            <Link
              href="/main"
              className="flex items-center space-x-4 text-xl transition-colors duration-75 hover:bg-gray-800 rounded-xl p-3"
            >
              <Mail />
              <span>Messages</span>
            </Link>
            <Link
              href={props.user? `${FRONTEND}/main/user/${props.user?.emails[0].value}` : `${FRONTEND}/login`}
              className="flex items-center space-x-4 text-xl transition-colors duration-75 hover:bg-gray-800 rounded-xl p-3"
            >
              <User />
              <span>{props.user? `Profile` : `Login`}</span>
            </Link>
            {props.user && (
              <button
                onClick={() => props.setShowCreate(true)}
                className="bg-blue-500 text-white rounded-full py-3 transition-colors duration-75 px-6 font-bold hover:bg-blue-600"
              >
                Post
              </button>
            )}
          </div>
        </nav>
    );
}

export default LeftSideBar;