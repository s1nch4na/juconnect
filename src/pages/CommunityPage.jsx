import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";
import CommunitySidebar from "../components/CommunitySidebar";
import CommunityList from "../components/CommunityList";
import CreatePost from "../components/CreatePost"; // Modal

const CommunityPage = ({ currentUserId }) => {
  const { communityId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPostsAndCommunity = async () => {
      try {
        const postsQuery = query(
          collection(db, "posts"),
          where("communityId", "==", communityId)
        );
        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);

        const communityRef = doc(db, "communities", communityId);
        const communitySnap = await getDoc(communityRef);
        if (communitySnap.exists()) {
          setCommunityInfo(communitySnap.data());
        }
      } catch (err) {
        console.error("Error fetching community data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndCommunity();
  }, [communityId]);

  return (
    <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto px-4 py-6">
      
      <aside className="hidden lg:block col-span-2">
        <CommunityList />
      </aside>

      <main className="col-span-12 lg:col-span-7">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold">r/{communityId}</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Post
          </button>
        </div>

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet in this community.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}

        {isModalOpen && (
          <CreatePost
            onClose={() => setIsModalOpen(false)}
            communityId={communityId}
            currentUserId={currentUserId}
          />
        )}
      </main>

      <aside className="hidden lg:block col-span-3">
        {communityInfo && (
          <CommunitySidebar
            name={communityId}
            description={communityInfo.description}
            stats={{
              subscribers: communityInfo.subscribers || 0,
              online: communityInfo.online || 0,
              totalPosts: posts.length,
            }}
          />
        )}
      </aside>
    </div>
  );
};

export default CommunityPage;
