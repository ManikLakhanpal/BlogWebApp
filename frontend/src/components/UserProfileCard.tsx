import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useUser } from "@/context/UserContext";
import axios from "axios";

interface Props {
    userData: {
        name: string;
        email: string;
        photo: string;
        bio: string;
        followers: Array<{ name: string; email: string }>;
        following: Array<{ name: string; email: string }>;
        posts: string;
    };
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
    showSettings: boolean;
    posts: number;
    uid: string;
}

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

function UserProfileCard(props: Props) {
    const { user } = useUser();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (user && props.userData?.followers) {
            setIsFollowing(props.userData.followers.some(f => f.email === user.emails[0].value));
        }
    }, [user, props.userData?.followers]);

    const handleFollow = async () => {
        try {
            const response = await axios.post(`${BACKEND}/api/user/follow/${props.userData.email}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true  // If your server requires authentication with cookies
            });
            setIsFollowing(response.data.following);
        } catch (error) {
            console.error('Failed to follow/unfollow:', error);
        }
    };

    return (
        <div className="flex flex-col sticky top-20 border-b p-4 bg-slate-950">
            <div className="flex items-start gap-4">
                <div className="relative aspect-square h-20 w-20 overflow-hidden sm:h-24 sm:w-24">
                    <Image
                        src={props.userData ? props.userData.photo : "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"}
                        alt="Profile picture"
                        fill
                        className="rounded-full border-2 object-cover"
                        priority
                    />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="truncate text-lg font-bold sm:text-xl">
                            {props.userData?.name}
                        </h1>
                        {props.userData?.email === user?.emails[0].value && (
                            <span
                                className="font-black items-center transition-all duration-75 hover:-rotate-90 justify-center cursor-pointer rounded-full"
                                onClick={() => props.setShowSettings(!props.showSettings)}
                            >
                                <Settings />
                            </span>
                        )}
                    </div>
                    <h2 className="text-sm text-gray-400">
                        @{props.uid}
                    </h2>
                    {props.userData?.email !== user?.emails[0].value && (
                        <span>
                            <Button
                                className={`w-1/3 h-7 my-3 ${
                                    isFollowing
                                        ? 'bg-gray-500 hover:bg-red-700'
                                        : 'bg-blue-500 hover:bg-blue-700'
                                }`}
                                onClick={handleFollow}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </Button>
                        </span>
                    )}
                </div>
            </div>

            <p className="mt-2 text-sm">
                {props.userData?.bio}
            </p>

            <div className="mt-4 grid grid-cols-3 text-sm">
                <div className="flex flex-col items-center">
                    <span className="font-semibold">Posts</span>
                    <span className="text-xs">{props.posts}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold">Followers</span>
                    <span className="text-xs">{props.userData?.followers.length}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold">Following</span>
                    <span className="text-xs">{props.userData?.following.length}</span>
                </div>
            </div>
        </div>
    );
}

export default UserProfileCard;