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
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3"
    >
      <textarea
        rows={4}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <button
        type="submit"
        className="self-end bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentForm;