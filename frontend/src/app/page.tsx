import Image from "next/image";
import NavigationBar from "@/containers/navigationBar";
import HeroPage from "@/containers/heroPage";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <HeroPage />
    </div>
  );
}
