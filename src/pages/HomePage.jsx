import React from 'react';

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-[#0b1416] text-white">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-700 bg-[#1a1a1b]">
        <div className="flex items-center gap-4">
          <img src="/reddit-logo.png" alt="Logo" className="h-8" />
          <span className="text-xl font-semibold">Reddit</span>
        </div>
        <input
          type="text"
          placeholder="Search Reddit"
          className="px-4 py-2 w-1/3 rounded bg-[#272729] text-white border border-gray-600"
        />
        <div className="flex gap-4 items-center">
          <button className="px-4 py-1 bg-blue-600 text-white rounded">Log In</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 p-4 border-r border-gray-700 overflow-y-auto hidden lg:block">
          <nav className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-gray-300">Main</p>
              <ul className="space-y-2 mt-1">
                <li>🏠 Home</li>
                <li>📈 Popular</li>
              </ul>
            </div>
        
          </nav>
        </aside>

        {/* Center Feed */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Trending banner (optional) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#1a1a1b] rounded p-3 shadow border border-gray-700">
                <p className="font-medium">Trending #{i + 1}</p>
              </div>
            ))}
          </div>

          {/* Posts */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1b] p-4 rounded shadow border border-gray-700">
              <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
                <span>r/india | 2h ago</span>
                <button className="bg-blue-600 text-white px-2 py-1 rounded">Join</button>
              </div>
              <h3 className="text-lg font-semibold">Example post title #{i + 1}</h3>
              <p className="text-sm text-gray-300 mt-2">Post content or image here...</p>

              {/* Actions */}
              <div className="flex gap-6 mt-4 text-sm text-gray-400">
                <button>⬆️⬇️ 1.2k</button>
                <button>💬 89</button>
                <button>🔗 Share</button>
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 p-4 border-l border-gray-700 hidden lg:block">
          <h4 className="text-sm font-bold mb-3">Popular Communities</h4>
          <ul className="space-y-2 text-sm">
            <li>r/alumni</li>
            <li>r/hackathonupdates</li>
            <li>r/jayanagararounds</li>
            <li>r/letsconnect</li>
            <li>r/notesarchive</li>
            <li> r/whatsupju</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
