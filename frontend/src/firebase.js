// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB38GamQqwxnkFnjAMsiAqSrxpv6w9e2sM",
  authDomain: "kippys-tarot.firebaseapp.com",
  projectId: "kippys-tarot",
  storageBucket: "kippys-tarot.firebasestorage.app",
  messagingSenderId: "297667414186",
  appId: "1:297667414186:web:f3e5b4b88bdd1acbdde8d3",
  measurementId: "G-NBBZNKM7RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);