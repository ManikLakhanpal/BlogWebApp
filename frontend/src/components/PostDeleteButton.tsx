"use client";

import { useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const BACKEND = "http://localhost:5000";

interface Props {
  id: string;
}

function PostDeleteButton(props: Props) {
  const [showPrompt, setShowPrompt] = useState(false);

  function handleDeleteClick() {
    setShowPrompt(true);
  }

  async function handleConfirmDelete() {
    try {
      // Make DELETE request to the backend
      console.log(props);
      await axios.delete(`${BACKEND}/delete/post/${props.id}`, { withCredentials: true });
      console.log("Post deleted");
      // You may want to trigger additional actions here, such as refreshing the post list
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      window.location.reload();
      setShowPrompt(false);
    }
  }

  function handleCancel() {
    setShowPrompt(false);
  }

  return (
    <div>
      <button
        className="text-gray-500 hover:text-red-500 transition-colors duration-200"
        onClick={handleDeleteClick}
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {showPrompt && (
        <div className="fixed inset-0 z-50 bg-gray-950 bg-opacity-70 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-md shadow-lg">
            <p className="text-gray-300 mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                onClick={handleConfirmDelete}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDeleteButton;