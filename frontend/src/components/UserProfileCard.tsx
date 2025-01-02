import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Props {
    userData: {
        name: string;
        email: string;
        photo: string;
        bio: string;
        followers: string;
        following: string;
        posts: string;
    };
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
    showSettings: boolean;
    posts: number;
    uid: string;
}

function UserProfileCard(props: Props) {
    const {user, loading, error} = useUser();

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
                        {props.userData?.email == user?.emails[0].value && (
                            <span
                                className="font-black items-center transition-all duration-75 hover:-rotate-90 justify-center cursor-pointer rounded-full"
                                onClick={() => {props.setShowSettings(!props.showSettings)}}
                            >
                                <Settings />
                            </span>
                        )}
                    </div>
                    <h2 className="text-sm text-gray-400">
                        @{props.uid}
                    </h2>
                    {props.userData?.email != user?.emails[0].value && (
                        <span>
                            <Button
                                className="bg-blue-500 w-1/3 hover:bg-blue-700 h-8 my-3"
                                onClick={() => { alert("Im currently working on it :-)")}}
                            >
                                Follow
                            </Button>
                        </span>
                    )}
                </div>
            </div>

            <p className="mt-2 text-sm">
                {props.userData?.bio}
            </p>

            <div className="mt-4 flex justify-between text-sm">
                <div className="flex flex-col items-center">
                    <span className="font-semibold">Posts</span>
                    <span className="text-xsr">{props.posts}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold">Followers</span>
                    <span className="text-xs">{props.userData?.followers}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold">Following</span>
                    <span className="text-xs">{props.userData?.following}</span>
                </div>
            </div>
        </div>
    );
}

export default UserProfileCard;