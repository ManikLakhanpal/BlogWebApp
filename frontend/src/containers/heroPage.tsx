"use client";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { Plus } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const BACKEND = "http://localhost:5000";

interface Post {
  name: string;
  content: string;
  photo: string;
  email: string;
}

export default function HeroPage() {
  const { user, loading, error } = useUser();
  const [showCreate, setShowCreate] = useState(false);
  const [textInput, setTextInput] = useState("");
  
  const [postData, setPostData] = useState<Post[]>([]);

  const handleCancel = () => {
    setTextInput("");
    setShowCreate(false);
  };

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic here

    const data = {
      name: user?.displayName,
      content: textInput,
      photo: user?.photos[0].value,
      email: user?.emails[0].value,
    };
    try {
      const resp = await axios.post(`${BACKEND}/add/posts`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Submitted:", textInput);
    } catch (error) {
      console.error("Error submitting post:", error);
    }

    setTextInput("");
    setShowCreate(false);
  }; 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BACKEND}/posts`);
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-screen max-h-fit w-screen">
      <h1 className="text-center text-4xl text-white mt-10 mb-5">Latest</h1>
      <div className="m-2 sm:mx-96 h-fit">
        {
          postData.map((post, index) => (
            <PostCard
              key={index}
              name={post.name}
              content={post.content}
              photo={post.photo}
              email={post.email}
            />
          ))
        }
      </div>
      {user != null && (
        <span
          className="bg-blue-400 sm:hidden fixed right-5 bottom-20 p-5 z-0 rounded-full"
          onClick={() => setShowCreate(!showCreate)}
        >
          <Plus />
        </span>
      )}

      {showCreate && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
          <div className="h-fit w-11/12 sm:w-6/12 bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={
                  user
                    ? user.photos[0].value
                    : "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
                }
                height={64}
                width={64}
                alt="Manik's profile picture"
                className="rounded-full border-2 border-gray-200"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-200">
                  {user?.displayName}
                </h1>
                <p className="text-sm text-gray-500">@Manik</p>
              </div>
            </div>

            <p className="text-right pb-2">
              { textInput.length } / 150
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                className="w-full h-32 p-3 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="Write something here..."
                value={textInput}
                maxLength={150}
                onChange={(e) => setTextInput(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
