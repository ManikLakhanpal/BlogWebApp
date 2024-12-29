import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import SparklesText from "@/components/ui/sparkles-text"
import ShinyButton from "@/components/ui/shiny-button"

export default function HomePage() {
  return (
    <section className="dark min-h-screen bg-black text-white">
      <div className=" text-white min-h-[90vh] max-h-fit">
        <div className="relative flex min-h-[90vh] max-h-fit w-full items-center justify-center overflow-hidden rounded-lg border-zinc-800
         border bg-zinc-950 p-6 md:p-10 lg:p-20">
          <div className="z-10 flex flex-col items-center space-y-6">
            <h1 className="whitespace-pre-wrap text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
              Welcome to 
              <SparklesText 
                className="text-center" 
                text="Blogs" 
                sparklesCount={10}
                colors={{ first: '#A07CFE', second: '#FE8FB5' }}
              />
            </h1>
            <p className="text-center text-lg md:text-xl text-gray-400 max-w-[500px]">
              Join the conversation. Share your stories. Connect with writers and readers around the world.
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
    </section>
  )
}

