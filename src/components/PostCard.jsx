import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaCommentDots, FaShare } from "react-icons/fa";
import { handleVote } from "../utils/voting";

const PostCard = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes || 0);

  const userId = "anonymous"; // Replace later with logged in user

  const onUpvote = async () => {
    await handleVote({
      postId: post.id,
      userId,
      voteType: "upvote",
    });

    setUpvotes((prev) => prev + 1);
    setDownvotes((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const onDownvote = async () => {
    await handleVote({
      postId: post.id,
      userId,
      voteType: "downvote",
    });

    setDownvotes((prev) => prev + 1);
    setUpvotes((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleShare = () => {
    const url = `${window.location.origin}/post/${post.id}`;

    navigator.clipboard
      .writeText(url)
      .then(() => alert("Post link copied to clipboard!"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-white border rounded-md shadow hover:shadow-lg transition duration-200 p-4 mb-4">

      {/* Community + Author */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Link
          to={`/c/${post.communityId}`}
          className="font-semibold text-blue-600 hover:underline"
        >
          r/{post.communityId}
        </Link>

        <span>•</span>

        <span className="text-gray-500">
          Posted by u/{post.createdBy}
        </span>
      </div>

      {/* Clickable Content */}
      <Link to={`/post/${post.id}`} className="block">

        <h2 className="text-xl font-bold hover:text-blue-600 transition">
          {post.title}
        </h2>

        <p className="mt-2 text-gray-800">
          {post.content}
        </p>

      </Link>

      {/* Footer */}
      <div className="flex items-center gap-6 mt-4 text-gray-500">

        <button
          onClick={onUpvote}
          className="flex items-center gap-1 hover:text-orange-500"
        >
          <FaArrowUp />
          {upvotes}
        </button>

        <button
          onClick={onDownvote}
          className="flex items-center gap-1 hover:text-blue-500"
        >
          <FaArrowDown />
          {downvotes}
        </button>

        <Link
          to={`/post/${post.id}`}
          className="flex items-center gap-1 hover:text-black"
        >
          <FaCommentDots />
          {post.commentsCount || 0}
        </Link>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 hover:text-black"
        >
          <FaShare />
          Share
        </button>

      </div>

    </div>
  );
};

export default PostCard;