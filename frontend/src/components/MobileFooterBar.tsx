import { Home, Bell, Mail, User } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND;

function MobileFooterBar() {
    const {user, loading, error} = useUser();
    return (
        <nav
          className="flex sm:hidden text-white fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 justify-around items-center p-3"
          style={{
            backdropFilter: "blur(14px) saturate(100%)",
            WebkitBackdropFilter: "blur(14px) saturate(100%)",
            backgroundColor: "rgba(3, 3, 32, 0.6)",
          }}
        >
          <Link href="/" className="p-2 rounded-full hover:bg-gray-800">
            <Home className="w-6 h-6" />
          </Link>
          <Link href="/" className="p-2 rounded-full hover:bg-gray-800">
            <Bell className="w-6 h-6" />
          </Link>
          <Link href="/" className="p-2 rounded-full hover:bg-gray-800">
            <Mail className="w-6 h-6" />
          </Link>
          <Link href={user? `${FRONTEND}/user/${user?.emails[0].value}` : `${FRONTEND}/login` } className="p-2 rounded-full hover:bg-gray-800">
            <User className="w-6 h-6" />
          </Link>
        </nav>
    );
}

export default MobileFooterBar;