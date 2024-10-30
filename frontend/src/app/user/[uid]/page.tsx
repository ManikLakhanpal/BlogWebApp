import { UserProvider } from "@/context/UserContext";
import ProfilePage from "@/containers/profilePage";

function Page() {
    return(
        <UserProvider>
            <ProfilePage/>
        </UserProvider>
    );
}

export default Page;