import ProfilePage from "@/containers/profilePage";

async function Page({ params }: { params: Promise<{ uid: string }> }) {

    const uid = (await params).uid
    return(
        <ProfilePage
            uid={uid.replace("%40", "@")}
        />
    );
}

export default Page;