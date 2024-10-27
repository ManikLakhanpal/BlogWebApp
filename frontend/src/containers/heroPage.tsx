"use client";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { Plus } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

const BACKEND = "http://localhost:5000";

export default function HeroPage() {
  const { user, loading, error } = useUser();
  const [showCreate, setShowCreate] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleCancel = () => {
    setTextInput("");
    setShowCreate(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here

    const data = {
      name: user?.displayName,
      content: textInput,
      email: user?.emails[0].value,
    };
    try {
      const resp = await axios.post(`${BACKEND}/add/posts`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Submitted:", textInput);
    } catch (error) {
      console.error("Error submitting post:", error);
    }

    setTextInput("");
    setShowCreate(false);
  };

  return (
    <section className="min-h-screen max-h-fit w-screen">
      <h1 className="text-center text-4xl text-white mt-10 mb-5">Latest</h1>
      <div className="m-2 sm:mx-96 h-fit">
        <PostCard />
        <PostCard />
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
          <div className="h-fit w-3/4 bg-slate-800 rounded-lg shadow-lg p-6">
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
                  Manik Lakhanpal
                </h1>
                <p className="text-sm text-gray-500">@Manik</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                className="w-full h-32 p-3 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="Write something here..."
                value={textInput}
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
