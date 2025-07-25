import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaCommentDots, FaShare } from "react-icons/fa";
import { handleVote } from "../utils/voting"; // 🔁 Import voting logic

const PostCard = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes || 0);
  const userId = "anonymous"; // Replace with real user ID when auth is added

  const onUpvote = async () => {
    await handleVote({ postId: post.id, userId, voteType: "upvote" });
    // Refresh counts (optional: fetch from backend again or just guess)
    setUpvotes((prev) => prev + 1);
    setDownvotes((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const onDownvote = async () => {
    await handleVote({ postId: post.id, userId, voteType: "downvote" });
    setDownvotes((prev) => prev + 1);
    setUpvotes((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="bg-white border rounded-md shadow p-4 mb-4 hover:shadow-lg transition duration-200">
      {/* Top bar */}
      <div className="text-sm text-gray-600 mb-2 flex gap-2 items-center">
        <Link to={`/c/${post.communityId}`} className="font-semibold text-blue-600 hover:underline">
          r/{post.communityId}
        </Link>
        <span>•</span>
        <span className="text-gray-500">Posted by u/{post.createdBy}</span>
      </div>

      <h2 className="text-lg font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-800 mb-3">{post.content}</p>

      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center gap-4">
          <button onClick={onUpvote} className="hover:text-green-600 flex items-center gap-1">
            <FaArrowUp /> {upvotes}
          </button>
          <button onClick={onDownvote} className="hover:text-red-600 flex items-center gap-1">
            <FaArrowDown /> {downvotes}
          </button>
          <Link to={`/post/${post.id}`} className="hover:text-blue-600 flex items-center gap-1">
            <FaCommentDots /> {post.commentsCount} comments
          </Link>
        </div>
        <button className="hover:text-blue-600 flex items-center gap-1">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;
