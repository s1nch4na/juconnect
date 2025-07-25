import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const postDoc = await getDoc(doc(db, "posts", postId));
      setPost({ id: postDoc.id, ...postDoc.data() });

      const q = query(collection(db, "comments"), where("postId", "==", postId));
      const snap = await getDocs(q);
      const commentData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentData);
    };
    fetchPostAndComments();
  }, [postId]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.content}</p>

      <h2 className="mt-6 font-semibold">Comments:</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="border-t pt-2 mt-2">
            <p className="text-sm text-gray-700">{c.text}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostPage;
