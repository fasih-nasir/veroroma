import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc ,
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
  
        
        if (count >= 8) return; 

        prodcut_of_home_page.innerHTML += `
      <div class="col-lg-3 col-md-6 col-12 mix new-arrivals">
  <div class="product__item cards_of_home_categoreis_new">
    <div class="product__item__pic set-bg image-hover-box">
      <img src="${doc.data().image1}" class="img-fluid img-main" alt="">
      <img src="${doc.data().image2}" class="img-fluid img-hover" alt="">
      <p class="position-absolute top-0 bg-white shadow m-2 px-2 rounded-2">
        ${doc.data().category}
      </p>
    </div>
    <div class="product__item__tex mt-lg-2 pt-1 bg-white p-2 rounded-3">
      <h6 class="fw-normal fs-5">${doc.data().name}</h6>
      <div class="my-3 d-flex flex-row justify-content-between align-items-center">
        <h6>Rs : ${doc.data().price}</h6>
        <button class="bg-white p-2 border-0 shadow px-1 rounded-2">
          <a href="product_detail.html?=${doc.id}" class="text-decoration-none text-dark">See More</a>
        </button>
      </div>
    </div>
  </div>
</div>


        `
        ;
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
                                      <button class="bg-white p-2  border-0 shadow px-5 rounded-2">
  <a href="product_detail.html" class="text-decoration-none text-dark ">See More</a>
</button>
                       </div>
                       
                              <div>
                   
                              </div>
                            </div>
                        </div>
                    </div>
            `
            
          }
         
          
        })
}

/* =========== CATEOGORIES.HTML CODE END =================== */





var location_of_page = window.location.href.split("=");
var single_prdocut_detail_heef = document.getElementById("single_prdocut_detail_heef");

document.addEventListener("DOMContentLoaded", async () => {
  const location_of_page = window.location.href.split("=");
  const productId = location_of_page[1];
  const single_prdocut_detail_heef = document.getElementById("single_prdocut_detail_heef");

  if (location.pathname === "/product_detail.html" && single_prdocut_detail_heef) {
    document.getElementById("product_name_of_single_page").innerText = productId;

    const prodcRef = doc(db, "products", productId);
    const prodcSnapshot = await getDoc(prodcRef);

    if (prodcSnapshot.exists()) {
      const product = prodcSnapshot.data();

      single_prdocut_detail_heef.innerHTML = `
        <div class="col-lg-6">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <img src="${product.image1}" class="img-fluid col-12 product_image_of_single_page_is_o" alt="${product.name}">
          </div>
        </div>

        <div class="col-lg-6">
          <div>
            <h2 class="mb-2">${product.name}</h2>
            <h5 class="mb-2">Rs ${product.price}</h5>
            <p class="mb-2">${product.description}</p>
            <p class="lh-sm">Available in stock: ${product.quantity}</p>
            <p class="lh-sm">Category: ${product.category}</p>
          </div>

          <div class="d-flex flex-lg-row flex-column gap-3 align-items-center">
            <button type="button" class="bg-white shadow-lg border-0 px-3 rounded-2 p-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Buy Now
            </button>
            <button class="border-dark border-1 shadow-lg px-3 rounded-2 p-2">Add To Cart</button>
          </div>
        </div>

        <!-- Modal Code -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Complete Your Order</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="orderForm">
                  <div class="mb-3">
                    <label class="form-label">Your Name</label>
                    <input type="text" class="form-control" id="buyerName" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="text" class="form-control" id="buyerPhone" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="buyerQty" min="1" value="1" required>
                  </div>
                  <button type="submit" class="btn btn-success w-100">Send via WhatsApp</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      `;

      // Attach WhatsApp redirect on form submit
      setTimeout(() => {
        const form = document.getElementById("orderForm");
        if (form) {
          form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("buyerName").value.trim();
            const phone = document.getElementById("buyerPhone").value.trim();
            const qty = document.getElementById("buyerQty").value;

            const message = `*Order Details:*
Product: ${product.name}
Product ID: ${productId}
Price: Rs ${product.price}
Quantity: ${qty}

*Customer Info:*
Name: ${name}
Phone: ${phone}`;

            const whatsappURL = `https://wa.me/923111082474?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');

            // ✅ Clear form fields
            form.reset();

            // ✅ Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
            if (modal) {
              modal.hide();
            }
          });
        }
      }, 200);

    } else {
      console.log("❌ No such document!");
    }
  }
});
