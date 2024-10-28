"use client";
import { PostCard, PostCardTemp } from "@/components/PostCard";
import axios from "axios";
import { Plus } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import PostInput from "@/components/PostInput";

const BACKEND = "http://localhost:5000";

interface Post {
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
    <section className="min-h-screen max-h-fit w-screen z-0">
      <h1 className="text-center text-4xl text-white mt-10 mb-5">Latest</h1>
      <div className="m-2 sm:mx-96 h-fit">
        {postData.length !== 0 &&
          postData.map((post, index) => (
            <PostCard
              key={index}
              name={post.name}
              content={post.content}
              photo={post.photo}
              email={post.email}
              createdAt={post.createdAt}
            />
          ))}
        {/* // ! When there are no posts, show a temporary post card */}
        {postData.length === 0 &&
          Array.from({ length: 5 }).map((_, index) => (
            <PostCardTemp key={index} />
          ))}
      </div>
      {user != null && (
        <span
          className="bg-blue-400 sm:hidden fixed right-5 bottom-20 p-5 rounded-full"
          onClick={() => setShowCreate(!showCreate)}
        >
          <Plus />
        </span>
      )}

      {showCreate && (
        <PostInput showCreate={showCreate} setShowCreate={setShowCreate} />
      )}
    </section>
  );
}
