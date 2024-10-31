"use client"

import NavigationBar from "./navigationBar";
import LeftSideBar from "@/components/LeftSideBar";
import { useUser } from "@/context/UserContext";
import PostInput from "@/components/PostInput";
import MobileFooterBar from "@/components/MobileFooterBar";
import Image from "next/image";
import axios from "axios";
import { Plus, Settings } from "lucide-react";
import { PostCard, PostCardTemp } from "@/components/PostCard";
import { useState, useEffect } from "react";

const BACKEND = "http://localhost:5000";

// TODO ADD CASE IF NO USER FOUND

interface Post {
    _id: string;
    name: string;
    content: string;
    photo: string;
    email: string;
    createdAt: number;
}

interface Props {
    uid: string;
}

interface UserData {
    name: string;
    email: string;
    photo: string;
    bio: string;
    followers: string;
    following: string;
    posts: string;
}

function ProfilePage(props: Props) {
    const { user, loading, error } = useUser();
    const [showCreate, setShowCreate] = useState(false);
    const [userData, setUserData] = useState<UserData>();
    const [postData, setPostData] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${BACKEND}/user/${props.uid}`);
                setUserData(response.data.users[0]);

                setPostData(response.data.postsWithUserInfo);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchData();
    }, [user]);

    return (
        <>
            <NavigationBar />
            <div className="text-white bg-slate-950 flex h-screen justify-center">
                <LeftSideBar
                    user={user}
                    setShowCreate={setShowCreate}
                />

                <main className="w-full sm:w-1/2 max-w-xl border-x border-gray-800">
                    <div className="flex flex-col sticky top-20 border-b p-4 bg-slate-950">
                        <div className="flex items-start gap-4">
                            <div className="relative aspect-square h-20 w-20 overflow-hidden sm:h-24 sm:w-24">
                                <Image
                                    src={userData ? userData.photo : "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"}
                                    alt="Profile picture"
                                    fill
                                    className="rounded-full border-2 object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="truncate text-lg font-bold sm:text-xl">
                                        {userData?.name}
                                    </h1>
                                    {userData?.email == user?.emails[0].value && (
                                        <span
                                            className="font-black items-center transition-all duration-75 hover:-rotate-90 justify-center rounded-full">
                                            <Settings />
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-sm text-gray-400">
                                    {props.uid}
                                </h2>
                            </div>
                        </div>

                        <p className="mt-2 text-sm">
                            {userData?.bio}
                        </p>

                        <div className="mt-4 flex justify-between text-sm">
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">Posts</span>
                                <span className="text-xsr">{userData?.posts}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">Followers</span>
                                <span className="text-xs">{userData?.followers}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">Following</span>
                                <span className="text-xs">{userData?.following}</span>
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