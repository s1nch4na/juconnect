
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";
import CommunitySidebar from "../components/CommunitySidebar";
import CommunityList from "../components/CommunityList";

const CommunityPage = () => {
  const { communityId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [communityInfo, setCommunityInfo] = useState(null);

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
      <h1 className="text-3xl font-extrabold mb-4">r/{communityId}</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet in this community.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
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
