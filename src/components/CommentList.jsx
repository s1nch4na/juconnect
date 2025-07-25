import CommentForm from "./CommentForm";

const CommentList = ({ comments, onReply }) => {
  const buildTree = (parentId = null) =>
    comments
      .filter(comment => comment.parentId === parentId)
      .map(comment => (
        <div key={comment.id} className="mb-3 ml-4 border-l pl-4">
          <p className="text-sm"><strong>u/{comment.userId}</strong>: {comment.text}</p>
          <button
            className="text-xs text-blue-500 mt-1"
            onClick={() => onReply(comment.id)}
          >
            Reply
          </button>
          {buildTree(comment.id)}
        </div>
      ));

  return <div>{buildTree()}</div>;
};

export default CommentList;
