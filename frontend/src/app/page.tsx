import NavigationBar from "@/containers/navigationBar";
import HeroPage from "@/containers/heroPage";
import { UserProvider } from "@/context/UserContext";

export default function Home() {
  return (
    <UserProvider>
      <NavigationBar />
      <HeroPage />
    </UserProvider>
  );
}
