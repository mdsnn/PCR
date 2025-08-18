import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAW6oo9LIJXOcg7CoT8xr6lz0V1leBLb2s",
  authDomain: "shop-ed956.firebaseapp.com",
  projectId: "shop-ed956",
  storageBucket: "shop-ed956.firebasestorage.app",
  messagingSenderId: "611897282142",
  appId: "1:611897282142:web:13cce58417cfd43ca2aecf",
  measurementId: "G-5PJTN9ER8Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
