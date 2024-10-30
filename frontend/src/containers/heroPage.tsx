"use client";

import { PostCard, PostCardTemp } from "@/components/PostCard";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import LeftSideBar from "@/components/LeftSideBar";
import MobileFooterBar from "@/components/MobileFooterBar";
import PostInput from "@/components/PostInput";
import RightSideBar from "@/components/RightSideBar";

const BACKEND = "http://localhost:5000";

interface Post {
  _id: string;
  name: string;
  content: string;
  photo: string;
  email: string;
  createdAt: number;
}

export default function HeroPage() {
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
    <div className="min-h-screen bg-slate-950 text-white pb-16">
      {/* Desktop layout */}
      <div className="hidden sm:flex border-2 justify-center">
        {/* Left sidebar */}
        <LeftSideBar 
          user={user}
          setShowCreate={setShowCreate}
        />

        {/* Main content */}
        <main className="w-1/2 max-w-xl border-x border-gray-800">
          <h1 className="text-2xl font-bold p-4 border-b border-gray-800">
            Home
          </h1>
          <div className="divide-y divide-gray-800">
            {postData.length !== 0
              ? postData.map((post, index) => (
                  <PostCard
                    key={index}
                    id={post._id}
                    user={user? user?.emails[0].value : null}
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
          </div>
        </main>

        {/* Right sidebar */}
        <RightSideBar />
      </div>

      {/* Mobile layout */}
      <div className="sm:hidden">
        {/* Mobile header */}
        <header className="flex justify-between items-center p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Home</h1>
          <button className="p-2 rounded-full hover:bg-gray-800">
            <Search className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile main content */}
        <main className="pb-16">
          <div className="divide-y divide-gray-800">
            {postData.length !== 0
              ? postData.map((post, index) => (
                  <PostCard
                    key={index}
                    id={post._id}
                    user={user? user?.emails[0].value : null}
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
          </div>
        </main>

        {/* Mobile footer navigation */}

        <MobileFooterBar />

        {/* Mobile tweet button */}
        {user && (
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-500 text-white rounded-full p-4 fixed right-4 bottom-20 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>

      {showCreate && (
        <PostInput showCreate={showCreate} setShowCreate={setShowCreate} />
      )}
    </div>
  );
}
