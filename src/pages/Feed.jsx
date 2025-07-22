import React from 'react';
import CommunityList from "../components/communitylist";

const dummyPosts = [
  {
    id: 1,
    username: 'u/john_doe',
    title: 'What do you think about React 19?',
    content: 'I’ve been trying out the beta and it feels smoother...',
  },
  {
    id: 2,
    username: 'u/techgirl',
    title: 'Tailwind vs traditional CSS?',
    content: 'Honestly, I got way faster once I learned utility-first design.',
  },
];

const Feed = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl flex gap-6">
        
        {/* Left Vertical Sidebar — narrow */}
        <div className="w-48 hidden md:block">
          <CommunityList />
        </div>

        {/* Main Feed — wider */}
        <div className="flex-1 space-y-6">
          {dummyPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4"
            >
              <div className="text-xs text-gray-500 mb-1">
                Posted by <span className="font-medium">{post.username}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-3">{post.content}</p>

              <div className="flex space-x-6 text-sm text-gray-600">
                <button className="hover:text-blue-600">⬆️ Upvote</button>
                <button className="hover:text-red-600">⬇️ Downvote</button>
                <button className="hover:underline">💬 Comment</button>
                <button className="hover:underline">🔗 Share</button>
                <button className="hover:underline">💾 Save</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
