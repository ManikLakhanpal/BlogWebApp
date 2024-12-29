import {cn} from "@/lib/utils"
import {AnimatedGridPattern} from "@/components/ui/animated-grid-pattern"
import SparklesText from "@/components/ui/sparkles-text"
import ShinyButton from "@/components/ui/shiny-button"
import Particles from "@/components/ui/particles";
import {GradualSpacing} from "@/components/ui/gradual-spacing";
import Image from "next/image";
import {Globe} from "@/components/globe";

const technologies = [
    // Frontend technologies
    { name: 'JavaScript', icon: '/tech/javascript.svg', color: 'text-[#F7DF1E]' },
    { name: 'TypeScript', icon: '/tech/typescript.svg', color: 'text-[#3178C6]' },
    { name: 'React', icon: '/tech/react.svg', color: 'text-[#61DAFB]' },
    { name: 'Tailwind', icon: '/tech/tailwind.svg', color: 'text-[#38B2AC]' },
    { name: 'NextJs', icon: '/tech/nextjs.svg', color: 'text-[#a6a6a6]' },

    // Backend technologies
    { name: 'Node.js', icon: '/tech/nodejs.svg', color: 'text-[#339933]' },
    { name: 'Deno', icon: '/tech/deno.svg', color: 'text-[#ffffff]' },
    { name: 'Express.js', icon: '/tech/express.svg', color: 'text-[#000000]' },

    // Databases
    { name: 'MongoDB', icon: '/tech/mongodb.svg', color: 'text-[#47A248]' },

    // Tools and platforms
    { name: 'Docker', icon: '/tech/docker.svg', color: 'text-[#3178C6]' },
    { name: 'Nginx', icon: '/tech/nginx.svg', color: 'text-[#339933]' },
];

export default function HomePage() {
    return (
        <section className="dark min-h-screen bg-black text-white">
            <div className=" text-white min-h-[103vh] max-h-fit">
                <div className="relative flex min-h-[103vh] max-h-fit w-full items-center justify-center overflow-hidden
        rounded-lg border-zinc-800 border bg-zinc-950 p-6 md:p-10 lg:p-20 font-sans">
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
                        <ShinyButton>
                            Log In
                        </ShinyButton>
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
            <div className="relative border-2 border-red-500 min-h-screen max-h-fit">
                <GradualSpacing
                    className="font-display mt-10 text-center text-4xl font-bold -tracking-widest
                     text-black dark:text-white md:text-7xl md:leading-[5rem]"
                    text="Technologies Used"
                    duration={3}
                />
                <div
                    className="grid grid-cols-2 md:grid-cols-3 relative lg:grid-cols-5 gap-8 mx-10
                    justify-items-center py-10 z-50">
                    {technologies.map((tech) => (
                        <div
                            key={tech.name}
                            className="group bg-white hover:cursor-pointer bg-opacity-15 flex flex-col items-center
                            justify-center p-6 rounded-xl transition-all duration-300 hover:scale-110"
                        >
                            <div className="relative w-20 h-20 mb-4">
                                <Image
                                    src={tech.icon}
                                    alt={`${tech.name} icon`}
                                    fill
                                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <span className={`text-xl font-medium ${tech.color}`}>
                {tech.name}
              </span>
                        </div>
                    ))}
                </div>
                <Particles
                    className="absolute inset-0 z-0"
                    quantity={100}
                    ease={80}
                    color={"#ffffff"}
                    refresh={true}
                />
            </div>
            <div className="min-h-screen max-h-fit bg-neutral-950">
                <Globe/>
            </div>
        </section>
    )
}

