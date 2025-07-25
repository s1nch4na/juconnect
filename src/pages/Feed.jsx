import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";
import CommunityList from "../components/CommunityList";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const allPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Group by communityId and take 1-2 random posts from each
        const grouped = {};
        allPosts.forEach(post => {
          if (!grouped[post.communityId]) grouped[post.communityId] = [];
          grouped[post.communityId].push(post);
        });

        const sampledPosts = [];
        for (const community in grouped) {
          const posts = grouped[community];
          const count = Math.min(posts.length, 2);
          const randomSample = posts.sort(() => 0.5 - Math.random()).slice(0, count);
          sampledPosts.push(...randomSample);
        }

        setPosts(sampledPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPosts();
  }, []);

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-6 gap-6">
      {/* Left Sidebar: Community List */}
      <aside className="hidden lg:block w-[240px] sticky top-20 h-fit">
        <CommunityList />
      </aside>

      {/* Center Feed */}
      <main className="flex-1 max-w-2xl">
        <h1 className="text-3xl font-extrabold mb-4">Your Feed</h1>
        {loading ? (
          <p>Loading feed...</p>
        ) : posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </main>

      {/* Right Sidebar: Reserved or Optional */}
      <aside className="hidden lg:block w-[300px] shrink-0 sticky top-20 h-fit">
        <div className="bg-white p-4 rounded-md shadow text-sm text-gray-500">
          <p>👋 Tip: Join communities to personalize your feed!</p>
        </div>
      </aside>
    </div>
  );
};

export default Feed;
