// Import Firebase core and services
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add this

// Your Firebase config
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

// ✅ Initialize and export services
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Add this line

export { auth, db }; // ✅ Export both
