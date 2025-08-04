
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1zoSG4uMziRnA1Iaiz5r-9UBbHwJTRD8",
  authDomain: "veroroma-1a37b.firebaseapp.com",
  projectId: "veroroma-1a37b",
  storageBucket: "veroroma-1a37b.appspot.com",
  messagingSenderId: "738682652885",
  appId: "1:738682652885:web:7dabde8d7285773e757a5c",
  measurementId: "G-LVGP1FPRMQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var header = document.getElementById("header");

if (header) {
  fetch("../header.html")
    .then((res) => res.text())
    .then((data) => {
      header.innerHTML = data;
 var nav_link_categories = document.getElementById("nav_link_categories");
 if (nav_link_categories) {
     async function fetch_option() {
       const categorySnapshot = await getDocs(collection(db, "categories"));
       
       categorySnapshot.forEach((doc) => {
   
        
         nav_link_categories.innerHTML += `
         <li><a class="dropdown-item" href="categories.html?=${doc.data().name.toLowerCase()}">${doc.data().name}</a></li>
         `;
       });
     }
     
   setTimeout(() => {
        fetch_option();
   }, 100);
   }
 
    })
    }