// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";

// ============| selections |============
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-desc");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID;

// ============| show product when page loads |============
window.addEventListener("DOMContentLoaded", async () => {
  // ============| getting id value and display product depending on ID value |============
  const urlID = window.location.search;
  // const urlID = "?id=hello";
  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      // console.log(product);
      // ============| destructure data from product |============
      const { id, fields } = product;
      productID = id;
      const { name, company, price, colors, description } = fields;
      const image = fields.image[0].thumbnails.large.url;
      // ============| setting the values |============
      document.title = `${name.toUpperCase()} | Serenity`;
      pageTitleDOM.innerHTML = `Home / ${name}`;
      imgDOM.src = image;
      titleDOM.innerHTML = name;
      companyDOM.innerHTML = `by ${company}`;
      priceDOM.innerHTML = `${formatPrice(price)}`;
      descDOM.innerHTML = description;
      // ============| mapping over colors |============
      colorsDOM.innerHTML = colors
        .map((color) => {
          return `<span class='product-color' style="background-color: ${color};"></span>`;
        })
        .join("");
    } else {
      // ============| in case id is wrong  |============
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
    <div>
  <h3 class="error">Sorry , something went wrong</h3>
  <a href="index.html" class="btn">back home</a>
    </div>`;
    }
  } catch (error) {
    console.log(error);
  }

  //   console.log(response);
  loading.style.display = "none";
});

// ============| add product to cart upon clicking the btn  |============
//
cartBtn.addEventListener("click", () => {
  addToCart(productID);
});
