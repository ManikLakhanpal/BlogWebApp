import LoginPage from "../../containers/loginPage";
import { UserProvider } from "../../context/UserContext";

export default function Home() {
  return (
    <UserProvider>
      <LoginPage />
    </UserProvider>
  );
}
