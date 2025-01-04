'use client'

import { X } from 'lucide-react'
import Image from "next/image"

interface Follower {
    name: string
    email: string
    photo: string
}

interface Props {
    followers: Follower[]
    setIsOpen: (showCreate: boolean) => void
    isOpen: boolean
}

export default function FollowerList(props: Props) {

    const closeModal = () => props.setIsOpen(false)

    if (!props.isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
            <div className="relative min-h-fit max-h-[80vh] w-11/12 overflow-y-auto rounded-lg bg-slate-800 p-6 shadow-lg sm:w-[600px]">
                <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>

                <h2 className="mb-6 text-2xl font-bold text-gray-200">Followers</h2>

                <div className="space-y-6">
                    {props.followers.map((follower, index) => (
                        <div key={index} className="flex items-center space-x-4 border-b border-gray-700 pb-4 last:border-b-0">
                            <Image
                                src={follower.photo}
                                height={64}
                                width={64}
                                alt={`${follower.name}'s profile picture`}
                                className="rounded-full border-2 border-gray-200"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-gray-200">{follower.name}</h3>
                                <p className="text-sm text-gray-500">{follower.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

