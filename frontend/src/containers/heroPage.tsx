import Image from "next/image"
import PostCard from "@/components/PostCard"

export default function HeroPage() {
  return (
    <section className="h-screen w-screen">
        <h1 className="text-center text-4xl">Latest</h1>
      <div className="border-red-500 border-2 m-5 sm:mx-96 h-full">
        <PostCard />
      </div>
    </section>
  )
}