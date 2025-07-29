import {
  collection,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

export const fetchComments = async (postId) => {
  const q = query(collection(db, "posts", postId, "comments"));
  const snap = await getDocs(q);

  const comments = await Promise.all(
    snap.docs.map(async (docSnap) => {
      const data = docSnap.data();
      let username = "anonymous";

      try {
        const userSnap = await getDoc(doc(db, "users", data.createdBy));
        if (userSnap.exists()) {
          username = userSnap.data().username;
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }

      return {
        id: docSnap.id,
        ...data,
        username,
      };
    })
  );

  return comments;
};

export const postComment = async ({ postId, text, userId, parentId = null }) => {
  await addDoc(collection(db, "posts", postId, "comments"), {
    content: text,
    createdBy: userId,
    createdAt: serverTimestamp(),
    parentId,
  });

  //  increment commentsCount in the parent post document
  await updateDoc(doc(db, "posts", postId), {
    commentsCount: increment(1),
  });
};
