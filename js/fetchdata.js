   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { getFirestore, collection, addDoc ,getDocs} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyC1zoSG4uMziRnA1Iaiz5r-9UBbHwJTRD8",
      authDomain: "veroroma-1a37b.firebaseapp.com",
      projectId: "veroroma-1a37b",
      storageBucket: "veroroma-1a37b.appspot.com",
      messagingSenderId: "738682652885",
      appId: "1:738682652885:web:7dabde8d7285773e757a5c",
      measurementId: "G-LVGP1FPRMQ"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

// 4. Fetch data from "categories" collection

var categories_product=document.getElementById("categories_product");
if(categories_product){
async function fetchCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));

    const htmlContent = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log(data.imgUrl); // Console log works fine
      return `
        <div class="col-6 col-md-4 col-lg-2">
          <a href="categories.html?${data.name}" class="text-decoration-none text-dark">
            <img src="${data.imgUrl}" class="img-fluid rounded" alt="${data.name}">
            <h6 class="mt-2">${data.name}</h6>
          </a>
        </div>
      `;
    }).join("");

    categories_product.innerHTML = htmlContent;

  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}


// 5. Call the function
fetchCategories()
}