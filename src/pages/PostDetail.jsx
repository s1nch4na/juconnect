import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { fetchComments, postComment } from "../utils/comments";
import { auth } from "../firebase";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import CommunityList from "../components/CommunityList";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Post not found.");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    const loadComments = async () => {
      const fetched = await fetchComments(postId);
      setComments(fetched);
    };

    fetchPost();
    loadComments();
  }, [postId]);

  const handleNewComment = async (text) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    await postComment({ postId, text, userId, parentId: replyTo });
    setReplyTo(null);
    const updated = await fetchComments(postId);
    setComments(updated);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!post) return <p className="p-4">Post not found.</p>;

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-6 gap-6">
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-[240px] sticky top-20 h-fit">
        <CommunityList />
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl bg-white shadow-md rounded p-4">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-600 mb-1">
          Posted by u/{post.createdBy} in r/{post.communityId}
        </p>
        <p className="text-base text-gray-800 mt-3">{post.content}</p>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <CommentForm
            onSubmit={handleNewComment}
            placeholder={replyTo ? "Replying..." : "Add a comment..."}
          />
          <CommentList comments={comments} onReply={(id) => setReplyTo(id)} />
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-[300px] shrink-0 sticky top-20 h-fit">
        <div className="bg-white p-4 rounded-md shadow text-sm text-gray-500">
          <p>👋 Tip: Join communities to personalize your feed!</p>
        </div>
      </aside>
    </div>
  );
};

export default PostDetail;
