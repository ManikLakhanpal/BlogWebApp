import { Home, Bell, Mail, User } from "lucide-react";

interface Props {
    user: object | null;
    setShowCreate: Function
}

function LeftSideBar(props: Props) {
    return (
        <nav className="w-1/4 max-w-xs fixed left-0 h-screen p-4">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="flex items-center space-x-4 text-xl transition-colors duration-75 hover:bg-gray-800 rounded-xl p-3"
            >
              <Home />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-xl transition-colors duration-75 hover:bg-gray-800 rounded-xl p-3"
            >
              <Bell />
              <span>Notifications</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-xl transition-colors duration-75 hover:bg-gray-800 rounded-xl p-3"
            >
              <Mail />
              <span>Messages</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-xl transition-colors duration-75 hover:bg-gray-800 rounded-xl p-3"
            >
              <User />
              <span>Profile</span>
            </a>
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