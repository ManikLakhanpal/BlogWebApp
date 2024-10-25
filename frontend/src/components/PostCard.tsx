import Image from "next/image";
import { Heart, Flag, Bookmark, Share } from 'lucide-react'

function PostCard() {
    return (
        <div className="p-4 sm:p-6 border border-gray-500 rounded-md">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src="https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
              height={64}
              width={64}
              alt="Manik's profile picture"
              className="rounded-full border-2 border-gray-200"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-200">Manik</h1>
              <p className="text-sm text-gray-500">@Manik</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nemo alias perspiciatis reprehenderit ut magnam.
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