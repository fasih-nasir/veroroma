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

// 4. Fetch data from "categories" collection

var categories_product = document.getElementById("categories_product");

if (categories_product) {
  async function fetchCategories() {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const allDocs = querySnapshot.docs;

      // Limit to 5 only if more than 5 exist
      const limitedDocs = allDocs.length > 5 ? allDocs.slice(0, 5) : allDocs;

      const htmlContent = limitedDocs
        .map((doc) => {
          const data = doc.data();

          return `
        <div class="col-5 col-md-3 col-lg-2 cards_of_home_categoreis">
          <a href="categories.html?=${data.name.toLowerCase()}" class="text-decoration-none text-dark">
            <img src="${data.imgUrl}" class="img-fluid rounded " alt="${data.name}">
            <h6 class="mt-2 text-uppercase">${data.name}</h6>
          </a>
        </div>
      `;
        })
        .join("");

      categories_product.innerHTML = htmlContent;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  fetchCategories();
}

// ========== FETCH PRODUCT IS HOME PAGE START ================
var prodcut_of_home_page = document.getElementById("prodcut_of_home_page");
if (prodcut_of_home_page) {
  async function fetchProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      let count = 0;
      querySnapshot.forEach((doc) => {
        if (count >= 8) return; // Stop after 8 products

        prodcut_of_home_page.innerHTML += `
          <div class="col-lg-3 col-md-6 col-12 mix new-arrivals cards_of_home_categoreis">
            <div class="product__item">
              <div class="product__item__pic set-bg image-hover-box">
                <img src="${doc.data().image1}" class="img-fluid shadow-sm img-main" alt="">
                <img src="${doc.data().image2}" class="img-fluid shadow-sm img-hover" alt="">
              </div>
              <div class="product__item__tex mt-lg-1">
              <p class="">${doc.data().category}</p>
                <h6 class="fw-bold fs-6 ">${doc.data().name}</h6>
                <div class="my-3 d-flex flex-row justify-content-between align-items-center">
                  <h6>Rs : ${doc.data().price}</h6>
                  <button class="add_to_card_btn bg text-white">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        `;
        count++;
      });
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  }

  fetchProducts();
}

// =========== FETCH PRODUCT IS HOME PAGE END ===============


// =================== CATEGOREIS.HTML CODE START ============================

// =================== CATEGOREIS.HTML CODE END ============================
var nav_link_categories = document.getElementById("nav_link_categories");
if (nav_link_categories) {
    async function fetch_option() {
      const categorySnapshot = await getDocs(collection(db, "categories"));
      
      categorySnapshot.forEach((doc) => {
        nav_link_categories.innerHTML += `
        <li><a class="dropdown-item" href="categories.html?=${doc.data().name}">${doc.data().name}</a></li>
        `;
      });
    }
    
  setTimeout(() => {
       fetch_option();
  }, 100);
  }


/* =========== CATEOGORIES.HTML CODE START =================== */
var location_of_page=window.location.href.split("=")
var product__filte_of_car_page=document.getElementById("product__filte_of_car_page")
if(location.pathname === "/categories.html" && product__filte_of_car_page){

     document.getElementById("category_name_of_page").innerHTML=location_of_page[1];

        const prodcSnapshot = await getDocs(collection(db, "products"));
        prodcSnapshot.forEach((e,index)=>{
         
          if(e.data().category.toLowerCase() === location_of_page[1]){
 
            product__filte_of_car_page.innerHTML+=`
             <div  class="col-lg-4 mb-2  col-12  m-0 p-0 w-100">
                        <div class="m-0 p-0 col-12">
                            <div class="image-hover-box">
           <img src="${e.data().image1}" class="img-fluid col-12 mb-lg-3 shadow-sm img-main" alt="">
           <img src="${e.data().image2}" class="img-fluid col-12 mb-lg-3 shadow-sm img-hover" alt="">
                              
                            </div>
                            <div class="p-3 mt-lg-3">
                                <h5>${e.data().name}</h5>
                              <p>${e.data().category}</p>
                              
                       <div class="my-2 d-flex flex-row justify-content-between align-items-center">
                                 <h6>${e.data().price}</h6>
                                 <button id="addtocard" class="add_to_card_btn">Add to cart</button>
                       </div>
                              
                            </div>
                        </div>
                    </div>
            `
            
          }
         
          
        })
}

/* =========== CATEOGORIES.HTML CODE END =================== */
