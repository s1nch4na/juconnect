import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import CommunityList from "../components/CommunityList";

const PostDetail = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/posts/${postId}/comments`
      );

      setComments(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${postId}`
        );

        setPost(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleNewComment = async (text) => {
    try {
      await axios.post(
        `http://localhost:5000/posts/${postId}/comments`,
        {
          author: "kemaru", // temporary
          content: text,
        }
      );

      setReplyTo(null);

      fetchComments();

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  if (!post) return <p className="p-4">Post not found.</p>;

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-6 gap-6">

      <aside className="hidden lg:block w-[240px] sticky top-20 h-fit">
        <CommunityList />
      </aside>

      <main className="flex-1 max-w-2xl bg-white rounded-md shadow p-6">

        <div className="text-sm text-gray-500 mb-2">
          r/{post.community_id} • Posted by u/{post.author}
        </div>

        <h1 className="text-3xl font-bold mb-4">
          {post.title}
        </h1>

        <p className="text-gray-800 whitespace-pre-wrap">
          {post.content}
        </p>

        <div className="mt-8 border-t pt-6">

          <h2 className="text-xl font-semibold mb-4">
            Comments
          </h2>

          <CommentForm
            onSubmit={handleNewComment}
            placeholder={
              replyTo
                ? "Replying..."
                : "What are your thoughts?"
            }
          />

          <CommentList
            comments={comments}
            onReply={(id) => setReplyTo(id)}
          />

        </div>

      </main>

      <aside className="hidden lg:block w-[300px]">

        <div className="bg-white rounded-md shadow p-4">

          <h3 className="font-semibold mb-2">
            About Community
          </h3>

          <p className="text-sm text-gray-500">
            Community information will go here.
          </p>

        </div>

      </aside>

    </div>
  );
};

export default PostDetail;