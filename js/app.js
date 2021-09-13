
// all products loading using api

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // const url = `http://127.0.0.1:5500/db.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");

    // single product loading area and buttons
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      
      <h4 class="text-danger" style="color:#e52f2b";>Price: $ ${product.price}</h4>
      <h5 class="text-warning" style="color:#f39c04;">Average Rating:  ${product.rating.rate}</h5>
      <h5 class="text-warning" style="color:#f39c04;">Total Rating:  ${product.rating.count}</h5>


     
      <div class="button-group">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add To Cart</button>
      <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-primary">Show Details</button>
      </div>
     </div>
      `;


    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;

// addToCart starts 

const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};


const detailDiv = document.createElement("div");

// showDetails starts 

const showDetails = (id) => {


  detailDiv.innerHTML = "";


  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {

      console.log(data);
      detailDiv.innerHTML = `
        <div class="col-md-6">
            <h1>${data.title}</h1>
            <h4 style="color:green">Description: ${data.description}</h4>
            <h4 style="color:red;">Price: $${data.price}</h4>
            
        </div>
      `;
    });



  document.getElementById("product-detail").appendChild(detailDiv);


};

// converting to float and return

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = (total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  const grandTotalFinal = grandTotal.toFixed(2);
  // console.log(grandTotal);
  document.getElementById("total").innerText = grandTotalFinal;
};
