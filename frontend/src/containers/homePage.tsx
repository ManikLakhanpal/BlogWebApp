import Link from "next/link";
import { FaCloud, FaDatabase } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiDeno, SiSocketdotio } from "react-icons/si";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen w-full flex flex-col justify-between p-4 bg-gradient-to-br from-black to-slate-900 text-white">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="max-w-4xl w-full space-y-8 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-blue-400">Blog</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
              A professional blog platform featuring integrated messaging
              capabilities (currently under development)
            </p>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
              Created by Manik Lakhanpal
            </p>
            <div className="flex justify-center">
              <div className="flex cursor-pointer w-1/2 justify-around items-center space-x-4">
                <SiDeno className="text-3xl text-white" title="Deno" />

                <RiNextjsFill
                  className="text-4xl text-white"
                  title="React (Next.js)"
                />
                <FaDatabase
                  className="text-3xl text-green-500"
                  title="MongoDB"
                />
                <SiSocketdotio
                  className="text-3xl text-yellow-400"
                  title="Socket.io"
                />
                <FaCloud
                  className="text-3xl text-purple-400"
                  title="Cloud Deployed"
                />
              </div>
            </div>
            <p className="text-lg sm:text-xl bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg">
              Site created using Deno, Next.js, MongoDB, Socket.io, Deployed on
              the Cloud
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/main"
                className="inline-block border-2 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                Home
              </Link>
              <Link
                href="/login"
                className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
