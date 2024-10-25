import Image from "next/image"
import PostCard from "@/components/PostCard"
import { Plus } from "lucide-react"

export default function HeroPage() {
  return (
    <section className="min-h-screen max-h-fit w-screen">
        <h1 className="text-center text-4xl mt-10 mb-5">Latest</h1>
      <div className="m-2 sm:mx-96 h-fit">
        <PostCard />
        <PostCard />
      </div>
      <span className="bg-blue-400 sm:hidden fixed right-5 bottom-20 p-5 rounded-full">
        <Plus />
      </span>
    </section>
  )
}