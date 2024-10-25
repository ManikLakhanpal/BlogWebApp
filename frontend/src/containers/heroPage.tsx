import Image from "next/image"
import PostCard from "@/components/PostCard"

export default function HeroPage() {
  return (
    <section className="min-h-screen max-h-fit w-screen">
        <h1 className="text-center text-4xl mt-10 mb-5">Latest</h1>
      <div className="border-red-500 border-2 m-2 sm:mx-96 h-fit">
        <PostCard />
        <PostCard />
      </div>
    </section>
  )
}