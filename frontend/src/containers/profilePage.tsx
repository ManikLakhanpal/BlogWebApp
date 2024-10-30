"use client"

import NavigationBar from "./navigationBar";
import LeftSideBar from "@/components/LeftSideBar";
import { useUser } from "@/context/UserContext";
import PostInput from "@/components/PostInput";
import MobileFooterBar from "@/components/MobileFooterBar";
import Image from "next/image";
import axios from "axios";
import { Plus } from "lucide-react";
import { PostCard, PostCardTemp } from "@/components/PostCard";
import { useState, useEffect } from "react";

const BACKEND = "http://localhost:5000";

interface Post {
    _id: string;
    name: string;
    content: string;
    photo: string;
    email: string;
    createdAt: number;
}

function ProfilePage() {
    const { user, loading, error } = useUser();
    const [showCreate, setShowCreate] = useState(false);
    const [postData, setPostData] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${BACKEND}/posts`);
                setPostData(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchData();
    }, [showCreate]);

    return (
        <>
            <NavigationBar />
            <div className="flex h-screen justify-center">
                <LeftSideBar
                    user={user}
                    setShowCreate={setShowCreate}
                />

                <main className="w-full sm:w-1/2 max-w-xl border-x border-gray-800">
                    <div className="flex flex-col sticky top-20 border-b p-4 bg-zinc-950">
                        <div className="flex items-start gap-4">
                            <div className="relative aspect-square h-20 w-20 overflow-hidden sm:h-24 sm:w-24">
                                <Image
                                    src={user ? user.photos[0].value : "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"}
                                    alt="Profile picture"
                                    fill
                                    className="rounded-full border-2 object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="truncate text-lg font-bold sm:text-xl">
                                        {user ? user.displayName : "Monkey D. Luffy"}
                                    </h1>
                                    <span className="bg-red-500 hidden font-black h-5 w-5 items-center justify-center rounded-full text-xs">
                                        3
                                    </span>
                                </div>
                                <h2 className="text-sm">
                                    @{user ? user.emails[0].value.split('@')[0] : "future_pirate_king"}
                                </h2>
                            </div>
                        </div>

                        <p className="mt-2 text-sm">
                            Aspiring Pirate King 👑 | Rubber Man 🦾 | Adventure Seeker 🏴‍☠️ | Meat Lover 🍖 | Nakama for life 🌊
                        </p>

                        <div className="mt-4 flex justify-between text-sm">
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">1,256</span>
                                <span className="text-xs">Posts</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">5.6M</span>
                                <span className="text-xs">Followers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">56</span>
                                <span className="text-xs">Following</span>
                            </div>
                        </div>
                    </div>
                    {postData.length !== 0
                        ? postData.map((post, index) => (
                            <PostCard
                                key={index}
                                id={post._id}
                                user={user ? user?.emails[0].value : null}
                                name={post.name}
                                content={post.content}
                                photo={post.photo}
                                email={post.email}
                                createdAt={post.createdAt}
                            />
                        ))
                        : Array.from({ length: 5 }).map((_, index) => (
                            <PostCardTemp key={index} />
                        ))}
                </main>
            </div>
            <MobileFooterBar />
            {user && (
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-500 text-white rounded-full p-4 fixed right-4 bottom-20 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
            {showCreate && (
                <PostInput
                    setShowCreate={setShowCreate}
                    showCreate={showCreate}
                />
            )}
        </>
    );
}

export default ProfilePage;