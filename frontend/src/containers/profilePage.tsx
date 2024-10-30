"use client"

import NavigationBar from "./navigationBar";
import LeftSideBar from "@/components/LeftSideBar";
import { useUser } from "@/context/UserContext";
import PostInput from "@/components/PostInput";
import MobileFooterBar from "@/components/MobileFooterBar";
import Image from "next/image";
import { useState } from "react";

function ProfilePage() {
    const { user, loading, error } = useUser();
    const [showCreate, setShowCreate] = useState(false);
    return(
        <>
            <NavigationBar />
            <div className="flex min-h-screen justify-center">
                <LeftSideBar
                    user={user}
                    setShowCreate={setShowCreate}
                 />

                 <main className="w-full sm:w-1/2 max-w-xl border-x border-gray-800">
                    <div className="border-b border-gray-800 p-3 flex items-center">
                        <Image
                            src={user? user.photos[0].value : "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"}
                            alt="user profile"
                            height={100}
                            width={100}
                            className="rounded-full border-2 h-24 w-24 border-gray-400"
                        />
                        <div className="mx-5 flex flex-col sm:w-1/2 justify-around">
                            <h1 className="font-bold text-2xl">
                                {user? user.displayName : "Manik"}
                            </h1>
                            <h6 className="text-gray-500 text-sm">
                                @{user? user.emails[0].value : "w1_manik"}
                            </h6>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing.
                            </p>
                        </div>
                    </div>
                 </main>
            </div>
            <MobileFooterBar />
            { showCreate && (
                <PostInput 
                    setShowCreate={setShowCreate}
                    showCreate={showCreate}
                />
            )}
        </>
    );
}

export default ProfilePage;