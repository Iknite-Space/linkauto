
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth"
import api from "./axios";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID

  // apiKey: "AIzaSyBJ_vipcWkelnSTwDG0RF7wfwinXWn5F3I",
  // authDomain: "autolink-883fc.firebaseapp.com",
  // projectId: "autolink-883fc",
  // storageBucket: "autolink-883fc.firebasestorage.app",
  // messagingSenderId: "573372789363",
  // appId: "1:573372789363:web:d7c1b750ec2f586f867006"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialise firebase auth and get a reference to the service
const auth = getAuth(app)

export {
    auth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
}

export default app;