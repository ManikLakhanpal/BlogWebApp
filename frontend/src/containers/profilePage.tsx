"use client"

import LeftSideBar from "@/components/LeftSideBar";
import { useUser } from "@/context/UserContext";
import PostInput from "@/components/PostInput";
import MobileFooterBar from "@/components/MobileFooterBar";
import axios from "axios";
import { Plus } from "lucide-react";
import { PostCard, PostCardTemp } from "@/components/PostCard";
import { useState, useEffect } from "react";
import UserProfileCard from "@/components/UserProfileCard";
import UserSettings from "@/components/UserSettings";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

// TODO ADD CASE IF NO USER FOUND

interface Post {
    _id: string;
    name: string;
    content: string;
    photo: string;
    uid: string;
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
    uid: string;
    followers: string;
    following: string;
    posts: string;
}

function ProfilePage(props: Props) {
    const { user, loading, error } = useUser();
    const [showCreate, setShowCreate] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [userData, setUserData] = useState<UserData>();
    const [postData, setPostData] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${BACKEND}/api/user/${props.uid}`);
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
            <div className="text-white bg-slate-950 flex min-h-screen justify-center pb-16">
                <LeftSideBar
                    user={user}
                    setShowCreate={setShowCreate}
                />
                {userData !== undefined && (
                    <main className="w-full sm:w-1/2 max-w-xl border-x border-gray-800">
                        {(userData) && (
                            <UserProfileCard
                                userData={userData}
                                showSettings={showSettings}
                                posts={postData.length}
                                setShowSettings={setShowSettings}
                                uid={userData.uid}
                            />
                        )}
                        {postData.length !== 0
                            ? postData.map((post, index) => (
                                <PostCard
                                    key={index}
                                    uid={post.uid}
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
                )}

                {userData == undefined && (
                    <main className="w-full sm:w-1/2 max-w-xl flex justify-center items-center border-x border-gray-800">
                        <h1 className="text-white text-center">User not available</h1>
                    </main>
                )}

            </div>
            <MobileFooterBar />
            {user && (
                <button
                    onClick={() => setShowCreate(true)}
                    className="bg-blue-500 sm:hidden text-white rounded-full p-4 fixed right-4 bottom-20 shadow-lg"
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
            {showSettings && (
                <UserSettings 
                    set={setShowSettings}
                    show={showSettings}
                    userData={userData || null}
                />
            )}
        </>
    );
}

export default ProfilePage;