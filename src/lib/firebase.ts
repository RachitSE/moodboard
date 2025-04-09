// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9XkHezwFc0V5QROSBzZPAmGIbGVmbcl4",
  authDomain: "moodboard-49c04.firebaseapp.com",
  projectId: "moodboard-49c04",
  storageBucket: "moodboard-49c04.appspot.com",
  messagingSenderId: "359425421316",
  appId: "1:359425421316:web:8b421a0e6e6666155c8551",
  measurementId: "G-X0PTGWQZBD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
