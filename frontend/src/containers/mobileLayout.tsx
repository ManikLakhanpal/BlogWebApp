import { PostCard, PostCardTemp } from "@/components/PostCard";
import MobileFooterBar from "@/components/MobileFooterBar";
import { Search, Plus } from 'lucide-react';

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

interface MobileLayoutProps {
    user: User | null;
    setShowCreate: (show: boolean) => void;
    postData: Post[];
}

export default function MobileLayout({ user, setShowCreate, postData }: MobileLayoutProps) {
    return (
        <div className="sm:hidden">
            <header className="flex justify-between items-center p-4 border-b border-gray-800">
                <h1 className="text-xl font-bold">Home</h1>
                <button className="p-2 rounded-full hover:bg-gray-800">
                    <Search className="w-5 h-5" />
                </button>
            </header>

            <main className="pb-16">
                <div className="divide-y divide-gray-800">
                    {postData.length !== 0
                        ? postData.map((post, index) => (
                            <PostCard
                                key={index}
                                id={post._id}
                                uid={post.uid}
                                user={user ? user.emails[0].value : null}
                                name={post.name}
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

            <MobileFooterBar />

            {user && (
                <button
                    onClick={() => setShowCreate(true)}
                    className="bg-blue-500 text-white rounded-full p-4 fixed right-4 bottom-20 shadow-lg"
                >
                    <Plus className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}

