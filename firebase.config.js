// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMfZji8N4cARN--0S0ntGKGopc2RHVekg",
  authDomain: "prep-english-58450.firebaseapp.com",
  projectId: "prep-english-58450",
  storageBucket: "prep-english-58450.appspot.com",
  messagingSenderId: "110418109082",
  appId: "1:110418109082:web:498c459a33c2ffacb8f523",
  measurementId: "G-NEHQJJHC92",
};

// Initialize Firebase

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
