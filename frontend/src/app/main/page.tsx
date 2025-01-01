"use client";

import axios from "axios";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useShowCreate } from "@/context/showCreate";
import PostInput from "@/components/PostInput";
import DesktopLayout from "@/containers/desktopLayout";
import MobileLayout from "@/containers/mobileLayout";

export interface Post {
  _id: string;
  name: string;
  content: string;
  photo: string;
  email: string;
  uid: string;
  createdAt: number;
}

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

export default function Home() {
  const { user, loading, error } = useUser();
  const { showCreate, setShowCreate } = useShowCreate();
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
        <DesktopLayout user={user} postData={postData} />
        <MobileLayout user={user} setShowCreate={setShowCreate} postData={postData} />

        {showCreate && (
            <PostInput showCreate={showCreate} setShowCreate={setShowCreate} />
        )}
      </div>
  );
}

