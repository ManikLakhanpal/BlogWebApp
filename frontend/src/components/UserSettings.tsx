"use client"

import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import { X } from "lucide-react"

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

interface Props {
  set: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean
  userData: {
    name: string;
    email: string;
    photo: string;
    bio: string;
    followers: string;
    following: string;
    uid: string;
    posts: string;
  } | null
}

export default function UserSettings(props: Props) {
  const user = props?.userData

  const [formData, setFormData] = useState({
    name: user?.name || "",
    userId: user?.uid || "",
    bio: user?.bio || ""
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      name: formData.name,
      uid: formData.userId,
      bio: formData.bio
    };

    try {
      const resp = await axios.put(`${BACKEND}/api/user/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true  // If your server requires authentication with cookies
      });
      console.log(resp.data);

      alert("User updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }

    props.set(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
      <div className="relative min-h-fit max-h-5/6 w-11/12 overflow-y-auto rounded-lg bg-slate-800 p-6 shadow-lg sm:h-auto sm:w-[600px]">
        <button
          onClick={() => props.set(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-600 sm:h-24 sm:w-24">
            <Image
              src={user?.photo || ""}
              alt="Profile picture"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Edit Profile</h2>
            <p className="text-sm text-gray-400">Update your profile information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Display Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Enter your display name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-300">
              User ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">@</span>
              <input
                type="text"
                id="userId"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="w-full rounded-md border border-gray-600 bg-gray-700 pl-8 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
                Bio
              </label>
              <label
                htmlFor="bio"
                className="lock text-sm font-medium text-gray-300 text-right"
              >
                {formData.bio.length} / 160
              </label>
            </div>

            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Write a short bio about yourself"
              maxLength={160}
            />
            <p className="text-xs text-gray-400">Brief description for your profile.</p>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}