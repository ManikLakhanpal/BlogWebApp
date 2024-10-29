"use client"

import Image from "next/image";
import { Heart, Flag, Bookmark, Share } from "lucide-react";
import PostDeleteButton from "./PostDeleteButton";

interface PostCardProps {
  id: string
  user: string | null;
  name: string;
  content: string;
  email: string;
  photo: string;
  createdAt: number;
}

function PostCard(props: PostCardProps) {
  const date = new Date(props.createdAt);
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);

  return (
    <div className="p-4 sm:p-6 border hover:cursor-pointer border-gray-900 rounded-sm">
      <div className="flex items-center space-x-4 mb-4">
        <Image
          src={props.photo}
          height={64}
          width={64}
          alt="Manik's profile picture"
          className="rounded-full border-2 border-gray-200"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-200">
            {props.name}
          </h1>
          <p className="text-sm text-gray-500">
            {props.email}
          </p>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-2">
        {props.content}
      </p>
      <p className="text-sm text-gray-500 mb-4">{formattedDate}</p>
      <div className="flex justify-around mt-2">
        <button className="text-gray-500 flex justify-center items-center rounded-full p-1 hover:text-pink-500 hover:bg-pink-500 hover:bg-opacity-30 transition-colors duration-200">
          <Heart className="w-5 h-5" />
        </button>
        <button className="text-gray-500 flex justify-center items-center rounded-full p-1 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-30 transition-colors duration-200">
          <Flag className="w-5 h-5" />
        </button>
        <button className="text-gray-500 flex justify-center items-center rounded-full p-1 hover:text-green-500 hover:bg-green-500 hover:bg-opacity-30 transition-colors duration-200">
          <Bookmark className="w-5 h-5" />
        </button>
        <button className="text-gray-500 flex justify-center items-center rounded-full p-1 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-30 transition-colors duration-200">
          <Share className="w-5 h-5" />
        </button>
        { (props.email === props.user) &&
          <PostDeleteButton
            id={props.id}
          />
        }
      </div>
    </div>
  );
}

function PostCardTemp() {
  return (
    <div className="p-4 sm:p-6 border border-gray-900 rounded-sm">
      <div className="flex items-center space-x-4 mb-4">
        
        <div className="animate-pulse bg-gray-800 h-16 w-16 rounded-full">

        </div>
        <div>
          <h1 className="animate-pulse mb-1 rounded-lg text-xl font-bold text-gray-800 bg-gray-800">
            placeholder text
          </h1>
          <p className="animate-pulse rounded-lg w-1/2 text-sm text-gray-800 bg-gray-800">
            na
          </p>
        </div>
      </div>
      <p className="animate-pulse p-5 text-gray-800 rounded-lg bg-gray-800 leading-relaxed mb-2">
        This is some content
      </p>
      <p className="animate-pulse rounded-lg text-sm text-gray-800 bg-gray-800 w-6/12 mb-4">none</p>
      <div className="flex justify-around mt-2">
        <button className="text-gray-500 hover:text-pink-500 transition-colors duration-200">
          <Heart className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
          <Flag className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-green-500 transition-colors duration-200">
          <Bookmark className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
          <Share className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export {PostCard, PostCardTemp};
