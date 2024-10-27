import Image from "next/image";
import { Heart, Flag, Bookmark, Share } from "lucide-react";

interface PostCardProps {
  name: string;
  content: string;
  email: string;
  photo: string;
}

function PostCard(props: PostCardProps) {
  return (
    <div className="p-4 sm:p-6 border border-gray-900 rounded-sm">
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
      <p className="text-sm text-gray-500 mb-4">13:34 · Oct 25, 2024</p>
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

export default PostCard;
