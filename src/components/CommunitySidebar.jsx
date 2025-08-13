import React from "react";

const CommunitySidebar = ({ name, description, stats }) => {
  return (
    <div className="w-full bg-white border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">r/{name}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="text-sm space-y-2">
        <p>👥 Subscribers: <strong>{stats.subscribers}</strong></p>
        <p>🟢 Online: <strong>{stats.online}</strong></p>
        <p>🧵 Posts: <strong>{stats.totalPosts}</strong></p>
      </div>
    </div>
  );
};

export default CommunitySidebar;