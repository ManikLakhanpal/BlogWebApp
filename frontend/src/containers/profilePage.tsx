"use client";

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
        <LeftSideBar user={user} setShowCreate={setShowCreate} />
        {userData !== undefined && (
          <main className="w-full sm:w-1/2 max-w-xl border-x border-gray-800">
            {userData && (
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

        {loading && (
          <main className="w-full sm:w-1/2 max-w-xl flex justify-center items-center border-x border-gray-800">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </main>
        )}

        {error && (
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
        <PostInput setShowCreate={setShowCreate} showCreate={showCreate} />
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
