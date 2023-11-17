import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUxFFmO2CI3bFbTkuwEVHXD1wK0FrKhyQ",
  authDomain: "blogproject-6aee1.firebaseapp.com",
  projectId: "blogproject-6aee1",
  storageBucket: "blogproject-6aee1.appspot.com",
  messagingSenderId: "514423804355",
  appId: "1:514423804355:web:965651cb2b3d168e5a2d76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
