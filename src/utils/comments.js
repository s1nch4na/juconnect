import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export const postComment = async ({ postId, text, userId, parentId = null }) => {
  const commentsRef = collection(db, "posts", postId, "comments");
  await addDoc(commentsRef, {
    text,
    userId,
    parentId, 
    createdAt: serverTimestamp(),
  });
};


export const fetchComments = async (postId) => {
  const commentsRef = collection(db, "posts", postId, "comments");
  const q = query(commentsRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
