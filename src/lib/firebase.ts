import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRbsTlyHNgf7EAhweD9D5bwv61QZMl458",
  authDomain: "mymensinghpost-20879.firebaseapp.com",
  projectId: "mymensinghpost-20879",
  storageBucket: "mymensinghpost-20879.appspot.com",
  messagingSenderId: "545063309307",
  appId: "1:545063309307:web:81fe5dca11041c8d7fc55e",
  measurementId: "G-D437CFCC3F"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);