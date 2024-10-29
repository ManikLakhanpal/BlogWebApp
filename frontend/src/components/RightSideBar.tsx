import { Search } from "lucide-react"
import Image from "next/image"

const users = [
  {
    name: "Manik",
    username: "w1_manik",
    imageUrl: "https://w16manik.blr1.cdn.digitaloceanspaces.com/Profile.jpeg"
  },
  {
    name: "Luffy",
    username: "onepiece",
    imageUrl: "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
  },
  {
    name: "Naruto",
    username: "uzumaki",
    imageUrl: "https://w16manik.blr1.cdn.digitaloceanspaces.com/Naruto.jpg"
  }
]

export default function RightSideBar() {
  return (
    <aside className="w-1/4 max-w-xs fixed right-0 h-screen p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-full mb-4 relative">
        <input
          type="text"
          placeholder="Search Blog"
          className="bg-transparent p-3 pl-12 w-full rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute top-3 left-4 text-gray-500" />
      </div>
      <div className="bg-gray-900 rounded-lg p-4">
        <h2 className="font-bold text-xl mb-4 text-white">Who to follow</h2>
        {users.map((user) => (
          <div key={user.username} className="flex hover:cursor-pointer items-center justify-between space-x-4 mb-5">
            <div className="flex items-center space-x-3">
              <Image
                src={user.imageUrl}
                height={55}
                width={55}
                alt={`${user.name}'s profile picture`}
                className="rounded-full border-2 border-gray-300"
              />
              <div className="flex flex-col">
                <h3 className="font-bold text-gray-200">{user.name}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded-full transition duration-300">
              Follow
            </button>
          </div>
        ))}
      </div>
    </aside>
  )
}