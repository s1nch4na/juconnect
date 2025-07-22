import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Adjust path if needed

const CommunityPage = () => {
  const { communityId } = useParams(); // This will be "alumni", "whatsapp", etc.
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("communityId", "==", communityId) // make sure field name matches Firestore
        );
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [communityId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">r/{communityId}</h1>
      <p>This is the page for the <strong>r/{communityId}</strong> community.</p>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet in this community.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-4 my-4 rounded-md shadow">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommunityPage;
