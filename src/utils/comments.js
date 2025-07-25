import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Add new comment
export const postComment = async ({ postId, text, userId, parentId = null }) => {
  const commentsRef = collection(db, "posts", postId, "comments");
  await addDoc(commentsRef, {
    text,
    userId,
    parentId, // null = top-level comment
    createdAt: serverTimestamp(),
  });
};

// Fetch all comments for a post
export const fetchComments = async (postId) => {
  const commentsRef = collection(db, "posts", postId, "comments");
  const q = query(commentsRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
