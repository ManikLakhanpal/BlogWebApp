import { PostCard, PostCardTemp } from "@/components/PostCard";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";

interface Post {
    _id: string;
    name: string;
    content: string;
    photo: string;
    email: string;
    uid: string;
    createdAt: number;
}

interface User {
    emails: { value: string }[];
    // Add other user properties as needed
}

interface DesktopLayoutProps {
    user: User | null;
    setShowCreate: (show: boolean) => void;
    postData: Post[];
}

export default function DesktopLayout({ user, setShowCreate, postData }: DesktopLayoutProps) {
    return (
        <div className="hidden sm:block">
            <LeftSideBar user={user} setShowCreate={setShowCreate} />
            <RightSideBar />
            <div className="flex justify-center">
                <main className="w-1/2 max-w-xl border-x border-gray-800">
                    <h1 className="text-2xl font-bold p-4 border-b border-gray-800">Home</h1>
                    <div className="divide-y divide-gray-800">
                        {postData.length !== 0
                            ? postData.map((post, index) => (
                                <PostCard
                                    key={index}
                                    id={post._id}
                                    user={user ? user.emails[0].value : null}
                                    name={post.name}
                                    uid={post.uid}
                                    content={post.content}
                                    photo={post.photo}
                                    email={post.email}
                                    createdAt={post.createdAt}
                                />
                            ))
                            : Array.from({ length: 5 }).map((_, index) => (
                                <PostCardTemp key={index} />
                            ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

