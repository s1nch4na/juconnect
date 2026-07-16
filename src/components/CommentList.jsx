import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaReply } from "react-icons/fa";

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 mt-6">
        No comments yet. Be the first to comment.
      </p>
    );
  }

  return (
    <div className="mt-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex gap-4 py-5 border-b border-gray-200"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shrink-0">
            {(comment.author || "?").charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">

            {/* Username */}
            <div className="flex items-center gap-2 text-sm mb-1">
              <Link
                to={`/u/${comment.author}`}
                className="font-semibold text-gray-900 hover:underline"
              >
                u/{comment.author}
              </Link>

              <span className="text-gray-400">
                • just now
              </span>
            </div>

            {/* Comment */}
            <p className="text-gray-800 whitespace-pre-wrap">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex gap-5 mt-3 text-gray-500 text-sm">

              <button className="flex items-center gap-1 hover:text-orange-500">
                <FaArrowUp />
              </button>

              <button className="flex items-center gap-1 hover:text-blue-500">
                <FaArrowDown />
              </button>

              <button className="flex items-center gap-1 hover:text-black">
                <FaReply />
                Reply
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;