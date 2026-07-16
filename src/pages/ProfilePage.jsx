import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${username}`
        );

        setProfile(res.data.user);
        setPosts(res.data.posts);
        setComments(res.data.comments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!profile) return <p className="p-6">User not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="bg-white rounded-lg shadow p-6 mb-6">

        <div className="flex items-center gap-5">

          <div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center text-4xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              u/{profile.username}
            </h1>


            <div className="flex gap-6 mt-3">

              <div>
                <span className="font-bold">
                  {posts.length}
                </span>{" "}
                Posts
              </div>

              <div>
                <span className="font-bold">
                  {comments.length}
                </span>{" "}
                Comments
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Recent Posts
        </h2>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="block border-b py-4 hover:bg-gray-50"
            >
              <h3 className="font-semibold">
                {post.title}
              </h3>

              <p className="text-gray-600">
                {post.content}
              </p>
            </Link>
          ))
        )}

      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-6">

        <h2 className="text-2xl font-bold mb-4">
          Recent Comments
        </h2>

        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b py-4"
            >
              <p>{comment.content}</p>

              <Link
                to={`/post/${comment.post_id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                View Post
              </Link>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default ProfilePage;