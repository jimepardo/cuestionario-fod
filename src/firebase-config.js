// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvX2YrCIMFadfYpcCbnmYGSXxj1wTh2UM",
  authDomain: "cuestionario-fod.firebaseapp.com",
  projectId: "cuestionario-fod",
  storageBucket: "cuestionario-fod.firebasestorage.app",
  messagingSenderId: "934895055669",
  appId: "1:934895055669:web:53437cf49094ab6e35127c",
  measurementId: "G-2LR611ZNNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); // Exportar la instancia de autenticación