import { useState } from "react";
import axios from "axios";

export default function CreatePost({
  onClose,
  communityId,
  currentUserId,
  onPostCreated,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/posts",
        {
          title,
          content,
          author: "kemaru", // temporary
          communityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post created!");

      if (onPostCreated) {
        await onPostCreated();
      }

      onClose();

    } catch (err) {
      console.error(err);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-5">Create Post</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded p-3 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="What's on your mind?"
          rows={8}
          className="w-full border rounded p-3 mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handlePublish}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}