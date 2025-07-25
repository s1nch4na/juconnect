import React from "react";
import { postsData } from "../data/postsData";
import { db, serverTimestamp } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const SeedPosts = () => {
  const handleSeed = async () => {
    try {
      for (const post of postsData) {
        await addDoc(collection(db, "posts"), {
          ...post,
          createdAt: serverTimestamp(),
          upvotes: 0,
          downvotes: 0,
          commentsCount: 0,
        });
        console.log("Seeded:", post.title);
      }
      alert("✅ Posts seeded successfully!");
    } catch (error) {
      console.error("Seeding failed", error);
      alert("❌ Seeding failed");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSeed}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Seed Posts
      </button>
    </div>
  );
};

export default SeedPosts;
