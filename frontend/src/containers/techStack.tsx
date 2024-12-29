import {GradualSpacing} from "@/components/ui/gradual-spacing";
import Image from "next/image";
import Particles from "@/components/ui/particles";

interface Technology {
    name: string;
    icon: string;
    color: string;
}

const technologies: Technology[] = [
    // Frontend technologies
    { name: 'React', icon: '/tech/react.svg', color: 'text-[#61DAFB]' },
    { name: 'NextJs', icon: '/tech/nextjs.svg', color: 'text-[#a6a6a6]' },
    { name: 'JavaScript', icon: '/tech/javascript.svg', color: 'text-[#F7DF1E]' },
    { name: 'TypeScript', icon: '/tech/typescript.svg', color: 'text-[#3178C6]' },
    { name: 'Tailwind', icon: '/tech/tailwind.svg', color: 'text-[#38B2AC]' },

    // Backend technologies
    { name: 'Node.js', icon: '/tech/nodejs.svg', color: 'text-[#339933]' },
    { name: 'Express.js', icon: '/tech/express.svg', color: 'text-[#000000]' },
    { name: 'Deno', icon: '/tech/deno.svg', color: 'text-[#ffffff]' },
    { name: 'Digital Ocean', icon: '/tech/digitalocean.svg', color: 'text-[#0058F5]' },

    // Databases
    { name: 'MongoDB', icon: '/tech/mongodb.svg', color: 'text-[#47A248]' },

    // Tools and platforms
    { name: 'Docker', icon: '/tech/docker.svg', color: 'text-[#3178C6]' },
    { name: 'Nginx', icon: '/tech/nginx.svg', color: 'text-[#339933]' },
];

export default function TechStack() {
    return (
        <div className="relative min-h-screen max-h-fit">
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
    );
}
