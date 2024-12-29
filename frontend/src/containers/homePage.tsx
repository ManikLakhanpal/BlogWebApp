"use client";

import Link from "next/link";
import { FaCloud, FaDatabase } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiDeno, SiSocketdotio } from "react-icons/si";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HomePage() {
  const heading = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(heading.current, {
      y: "-40%",
      opacity: "0",
      duration: 2,
      ease: "power4.out",
    });

    gsap.from(content.current, {
      x: "0%",
      opacity: "0",
      duration: 5,
      ease: "power4.out"
    })
  }, []);

  return (
    <>
      <main className="min-h-screen w-full flex flex-col justify-between p-4 bg-gradient-to-br from-black to-slate-900 text-white">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="max-w-4xl w-full space-y-8 text-center">
            <h1
              className="text-4xl sm:text-6xl font-bold tracking-tight"
              ref={heading}
            >
              Welcome to <span className="text-blue-400">Blog</span>
            </h1>
            
            <div ref={content}>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
                A professional blog platform featuring integrated messaging
                capabilities (currently under development)
              </p>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mt-5">
                Created by Maniik Lakhanpal
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex cursor-pointer w-1/2 justify-around items-center space-x-4">
                <SiDeno
                  className="text-3xl text-white deno"
                  title="Deno"
                  onClick={() => {
                    gsap.to(".deno", { rotation: "+=180" });
                  }}
                />

                <RiNextjsFill
                  className="text-4xl text-white react"
                  title="React (Next.js)"
                  onClick={() => {
                    gsap.to(".react", { rotation: "+=180" });
                  }}
                />
                <FaDatabase
                  className="text-3xl text-green-500 mongo"
                  title="MongoDB"
                  onClick={() => {
                    gsap.to(".mongo", { rotation: "+=180" });
                  }}
                />
                <SiSocketdotio
                  className="text-3xl text-yellow-400 socket"
                  title="Socket.io"
                  onClick={() => {
                    gsap.to(".socket", { rotation: "+=180" });
                  }}
                />
                <FaCloud
                  className="text-3xl text-purple-400 cloud"
                  title="Cloud Deployed"
                  onClick={() => {
                    gsap.to(".cloud", { rotation: "+=180" });
                  }}
                />
              </div>
            </div>
            <p className="text-lg sm:text-xl bg-gradient-to-b from-black to-slate-400 p-4 rounded-lg shadow-lg">
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
