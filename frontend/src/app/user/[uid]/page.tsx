import { UserProvider } from "@/context/UserContext";
import ProfilePage from "@/containers/profilePage";

async function Page({ params }: { params: Promise<{ uid: string }> }) {

    const uid = (await params).uid
    return(
        <UserProvider>
            <ProfilePage
                uid={uid.replace("%40", "@")}
            />
            <h1>{uid.replace("%40", "@")}</h1>
        </UserProvider>
    );
}

export default Page;