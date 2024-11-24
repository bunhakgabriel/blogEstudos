// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-UvYzhu2_1wcAahIw09e9FJszE9lwbfQ",
  authDomain: "blog-gabriel-55dad.firebaseapp.com",
  projectId: "blog-gabriel-55dad",
  storageBucket: "blog-gabriel-55dad.firebasestorage.app",
  messagingSenderId: "910630385396",
  appId: "1:910630385396:web:0d4d2b8830ab5c158a90a1",
  measurementId: "G-XPQGP7SQGP"
};


const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
