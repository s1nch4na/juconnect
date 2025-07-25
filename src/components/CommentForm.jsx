import { useState } from "react";

const CommentForm = ({ onSubmit, placeholder = "Add a comment..." }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 text-sm"
      />
      <button type="submit" className="mt-2 px-4 py-1 bg-blue-600 text-white rounded text-sm">Post</button>
    </form>
  );
};

export default CommentForm;
