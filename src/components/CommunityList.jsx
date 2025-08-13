import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      console.log("📡 Fetching communities...");
      try {
        const querySnapshot = await getDocs(collection(db, "communities"));
        const communityData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("✅ Communities fetched:", communityData);
        setCommunities(communityData);
      } catch (error) {
        console.error("❌ Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">Communities</h2>
      <ul className="space-y-2">
        {communities.map((comm) => (
          <li key={comm.id}>
            <Link
              to={`/c/${comm.id}`}
              className="text-blue-600 hover:underline break-words"
            >
              r/{comm.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;