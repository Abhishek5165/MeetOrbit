// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meet-orbit.firebaseapp.com",
  projectId: "meet-orbit",
  storageBucket: "meet-orbit.appspot.com",
  messagingSenderId: "358368973035",
  appId: "1:358368973035:web:2afc8c4e53a22bffebeeae",
  measurementId: "G-PNP0X9S1LY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);