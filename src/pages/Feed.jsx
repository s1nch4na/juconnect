import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import PostCard from "../components/PostCard";
import CommunityList from "../components/CommunityList";

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");



  // Fetch username from Firebase
  useEffect(() => {

    const fetchUsername = async () => {

      const user = auth.currentUser;

      if (user) {

        try {

          const userDoc = await getDoc(
            doc(db, "users", user.uid)
          );

          if (userDoc.exists()) {

            setUsername(
              userDoc.data().username
            );

          }

        } catch (err) {

          console.error(
            "Error fetching username:",
            err
          );

        }

      }

    };

    fetchUsername();

  }, []);




  // Fetch posts from Express + Neon
  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/posts"
        );


        const data = await response.json();


        setPosts(data);


      } catch (err) {

        console.error(
          "Failed to fetch posts:",
          err
        );

      } finally {

        setLoading(false);

      }

    };


    fetchPosts();

  }, []);




  return (

    <div className="flex max-w-7xl mx-auto px-4 py-6 gap-6">


      {/* Left Sidebar */}

      <aside className="hidden lg:block w-[240px] sticky top-20 h-fit">

        <CommunityList />

      </aside>




      {/* Main Feed */}

      <main className="flex-1 max-w-2xl">


        {username && (

          <div className="flex justify-between items-center mb-4">

            <h1 className="text-2xl font-semibold">

              Welcome, {username} 👋

            </h1>

          </div>

        )}


        <h1 className="text-3xl font-extrabold mb-4">

          Your Feed

        </h1>


        {loading ? (

          <p>Loading feed...</p>

        ) : posts.length === 0 ? (

          <p>No posts available.</p>

        ) : (

          posts.map((post) => (

            <PostCard
              key={post.id}
              post={post}
            />

          ))

        )}


      </main>




      {/* Right Sidebar */}

      <aside className="hidden lg:block w-[300px] shrink-0 sticky top-20 h-fit">

        <div className="bg-white p-4 rounded-md shadow text-sm text-gray-500">

          <p>

            👋 Tip: Join communities to personalize your feed!

          </p>

        </div>

      </aside>


    </div>

  );

};

export default Feed;