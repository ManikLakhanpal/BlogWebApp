import { Home, Bell, Mail, User } from "lucide-react";

function MobileFooterBar() {
    return (
        <nav
          className="flex sm:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 justify-around items-center p-3"
          style={{
            backdropFilter: "blur(14px) saturate(100%)",
            WebkitBackdropFilter: "blur(14px) saturate(100%)",
            backgroundColor: "rgba(3, 3, 32, 0.6)",
          }}
        >
          <a href="#" className="p-2 rounded-full hover:bg-gray-800">
            <Home className="w-6 h-6" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-800">
            <Bell className="w-6 h-6" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-800">
            <Mail className="w-6 h-6" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-800">
            <User className="w-6 h-6" />
          </a>
        </nav>
    );
}

export default MobileFooterBar;