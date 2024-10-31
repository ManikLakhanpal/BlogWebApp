"use client";

import Image from "next/image";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useState } from "react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

interface Props {
  setShowCreate: Function;
  showCreate: boolean;
}

function PostInput(props: Props) {
  const { user, loading, error } = useUser();
  const [textInput, setTextInput] = useState("");

  function handleCancel() {
    setTextInput("");
    props.setShowCreate(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic here

    const data = {
      content: textInput,
      createdAt: Number(Date.now()),
      user: user?.emails[0].value
    };
    try {
      const resp = await axios.post(`${BACKEND}/add/posts`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      window.location.reload();
      console.log("Submitted:", textInput);
    } catch (error) {
      console.error("Error submitting post:", error);
    }

    setTextInput("");
    props.setShowCreate(false);
  }

  return (
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
            <p className="text-sm text-gray-500">{user?.emails[0].value}</p>
          </div>
        </div>

        <p className="text-right text-white pb-2">{textInput.length} / 150</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-32 p-3 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Write something here..."
            value={textInput}
            maxLength={150}
            onChange={(e) => setTextInput(e.target.value)}
            autoFocus
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
  );
}

export default PostInput;
