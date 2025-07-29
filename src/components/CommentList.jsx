const CommentList = ({ comments, onReply, parentId = null }) => {
  return comments
    .filter((c) => c.parentId === parentId)
    .map((comment) => (
      <div key={comment.id} className={`mt-3 border-l-2 pl-3 ${parentId ? "ml-4" : ""}`}>
        <p className="text-sm text-gray-800">{comment.content}</p>
        <p className="text-xs text-gray-500">by u/{comment.username}</p>
        <button
          onClick={() => onReply(comment.id)}
          className="text-xs text-blue-500 mt-1"
        >
          Reply
        </button>

        <CommentList comments={comments} onReply={onReply} parentId={comment.id} />
      </div>
    ));
};

export default CommentList;
