// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1zoSG4uMziRnA1Iaiz5r-9UBbHwJTRD8",
  authDomain: "veroroma-1a37b.firebaseapp.com",
  projectId: "veroroma-1a37b",
  storageBucket: "veroroma-1a37b.firebasestorage.app",
  messagingSenderId: "738682652885",
  appId: "1:738682652885:web:7dabde8d7285773e757a5c",
  measurementId: "G-LVGP1FPRMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);