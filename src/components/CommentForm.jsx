import { useState } from "react";

const CommentForm = ({ onSubmit, placeholder }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 border px-3 py-2 text-sm rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 rounded text-sm"
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
