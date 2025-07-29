
import { doc, getDoc, setDoc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export const handleVote = async ({ postId, userId, voteType }) => {
  const voteRef = doc(db, "posts", postId, "votes", userId);
  const postRef = doc(db, "posts", postId);
  const voteSnap = await getDoc(voteRef);

  if (!voteSnap.exists()) {
    await setDoc(voteRef, { type: voteType });
    await updateDoc(postRef, {
      [voteType === "upvote" ? "upvotes" : "downvotes"]: increment(1),
    });
  } else {
    const existingType = voteSnap.data().type;
    if (existingType === voteType) {
      await deleteDoc(voteRef);
      await updateDoc(postRef, {
        [voteType === "upvote" ? "upvotes" : "downvotes"]: increment(-1),
      });
    } else {
      await setDoc(voteRef, { type: voteType });
      await updateDoc(postRef, {
        upvotes: increment(voteType === "upvote" ? 1 : -1),
        downvotes: increment(voteType === "downvote" ? 1 : -1),
      });
    }
  }
};
