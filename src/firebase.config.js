// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALkni5pyRgIRICFwtQE13Rti3DUqHYYEU",
  authDomain: "social-media-react-app-e2748.firebaseapp.com",
  projectId: "social-media-react-app-e2748",
  storageBucket: "social-media-react-app-e2748.appspot.com",
  messagingSenderId: "363154129881",
  appId: "1:363154129881:web:ef36831ec87406bb8d0fc8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const storage = getStorage(app);

export { storage };
