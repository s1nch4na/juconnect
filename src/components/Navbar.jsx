import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUsername(docSnap.data().username);
          } else {
            setUsername(currentUser.email); // fallback
          }
        } catch (err) {
          console.error("Error fetching user document:", err);
        }
      } else {
        setUsername(""); // logout fallback
      }
    });

    return () => unsubscribe(); // cleanup
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-blue-600">
        JuConnect
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/feed" className="text-gray-700 hover:text-blue-600">
          Feed
        </Link>
        <Link to="/c/hackathonupdates" className="text-gray-700 hover:text-blue-600">
          Hackathons
        </Link>
        <input
          type="text"
          placeholder="Search (coming soon)"
          className="border rounded px-3 py-1 text-sm w-48"
        />
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hi, {username}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link to="/signup" className="text-sm text-gray-600 hover:text-blue-600">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
