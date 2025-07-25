import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore"; // 👈 ADD serverTimestamp here

const firebaseConfig = {
  apiKey: "AIzaSyCiR6dDE2V8gWsNkhB79wJfl30LGBjx8CU",
  authDomain: "juconnect-38a89.firebaseapp.com",
  projectId: "juconnect-38a89",
  storageBucket: "juconnect-38a89.firebasestorage.app",
  messagingSenderId: "769773169466",
  appId: "1:769773169466:web:0891a6cd90142d98f37e03",
  measurementId: "G-S35XL47H1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, serverTimestamp }; // ✅ Add serverTimestamp here
