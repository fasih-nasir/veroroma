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

      const htmlContent = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();

          return `
        <div class="col-6 col-md-4 col-lg-2">
          <a href="categories.html?${data.name}" class="text-decoration-none text-dark">
            <img src="${data.imgUrl}" class="img-fluid rounded" alt="${data.name}">
            <h6 class="mt-2">${data.name}</h6>
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

  // 5. Call the function
  fetchCategories();
}

// ========== FETCH PRODUCT IS HOME PAGE START ================
var prodcut_of_home_page = document.getElementById("prodcut_of_home_page");
if (prodcut_of_home_page) {
  async function fetchProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        prodcut_of_home_page.innerHTML += `
              <div  class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 col-6 mix new-arrivals">
                        <div class="product__item">
                            <div class="product__item__pic set-bg image-hover-box">
           <img src="${doc.data().image1}" class="img-fluid mb-lg-3 shadow-sm img-main" alt="">
           <img src="${doc.data().image2}" class="img-fluid mb-lg-3 shadow-sm img-hover" alt="">
                              
                            </div>
                            <div class="product__item__tex mt-lg-3">
                                <h5>${doc.data().name}</h5>
                              <p>${doc.data().category}</p>
                              
                       <div class="my-2 d-flex flex-row justify-content-between align-items-center">
                                 <h6>${doc.data().price}</h6>
                                 <button id="addtocard" class="add_to_card_btn">Add to cart</button>
                       </div>
                              
                            </div>
                        </div>
                    </div>
        
        `;
        console.log("🛒 Product:", doc.data());
      });
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  }

  fetchProducts();
}
// =========== FETCH PRODUCT IS HOME PAGE END ===============
