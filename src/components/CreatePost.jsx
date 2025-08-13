import { useState } from "react";
import { db } from "../firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreatePost({ onClose, communityId, currentUserId }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handlePublish = async () => {
    if (!title || !body) return;

    try {
      await addDoc(collection(db, "posts"), {
        title,
        body,
        communityId,
        createdAt: serverTimestamp(),
        createdBy: currentUserId,
        upvotes: 0,
        downvotes: 0,
        comments: []
      });
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Create Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
