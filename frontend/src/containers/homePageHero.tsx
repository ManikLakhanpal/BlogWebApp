import SparklesText from "@/components/ui/sparkles-text";
import ShinyButton from "@/components/ui/shiny-button";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HomePageHero() {
    return (
        <div className=" text-white min-h-[103vh] max-h-fit w-screen">
            <div className="relative flex min-h-[103vh] max-h-fit w-full items-center justify-center overflow-hidden
        rounded-lg border-zinc-800 border-b-2 bg-zinc-950 p-6 md:p-10 lg:p-20 font-sans">
                <div className="z-10 flex flex-col items-center space-y-6">
                    <h1 className="whitespace-pre-wrap text-center text-4xl md:text-5xl lg:text-6xl
             tracking-tighter text-white font-black">
                        Welcome to
                        <SparklesText
                            className="text-center font-black"
                            text="Blogs"
                            sparklesCount={10}
                            colors={{first: '#A07CFE', second: '#FE8FB5'}}
                        />
                    </h1>
                    <p className="text-center text-lg md:text-xl text-gray-400 max-w-[500px] font-medium">
                        Join the conversation. Share your stories. Connect with writers and readers around the
                        world.
                    </p>

                    <p className="text-center text-lg md:text-xl text-gray-400 max-w-[500px] font-medium">
                        Created by Manik Lakhanpal 😎
                    </p>
                    <div className="sm:w-1/2 flex justify-around">
                        <Link href="/main">
                            <Button className="w-full flex items-center justify-around space-x-2">
                                <HomeIcon/>
                                <span>Home</span>
                            </Button>
                        </Link>
                        <Link href="/login">
                            <ShinyButton className="w-full flex items-center justify-center">
                                Log In
                            </ShinyButton>
                        </Link>
                    </div>
                </div>
                <AnimatedGridPattern
                    numSquares={60}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
                    )}
                />
            </div>

        </div>
    );
}