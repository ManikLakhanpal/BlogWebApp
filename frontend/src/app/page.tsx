import HomePageHero from "@/containers/homePageHero";
import TechStack from "@/containers/techStack";
import Footer from "@/components/Footer";
import {Globe} from "@/components/globe";

export default function HomePage() {
  return (
      <section className="dark min-h-screen bg-black text-white">
        <HomePageHero />
        <TechStack />
        <div className="min-h-screen max-h-fit border-t-2 bg-neutral-950">
          <Globe/>
        </div>
        <Footer />
      </section>
  )
}

