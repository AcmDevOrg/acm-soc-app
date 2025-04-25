// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "acm-soc-app.firebaseapp.com",
  projectId: "acm-soc-app",
  storageBucket: "acm-soc-app.firebasestorage.app",
  messagingSenderId: "478408294641",
  appId: "1:478408294641:web:584f4eef25d30a843c6950"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);