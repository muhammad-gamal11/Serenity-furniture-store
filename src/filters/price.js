import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const priceInput = getElement(".price-filter");
let priceValue = getElement(".price-value");

const setupPrice = (store) => {
  // ===========| setup filter |===========
  let maxPrice = store.map((product) => product.price);
  maxPrice = Math.max(...maxPrice); // getting highest price
  maxPrice = Math.ceil(maxPrice / 100);
  //   console.log(maxPrice);
  priceInput.value = maxPrice;
  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceValue.textContent = `value : $${maxPrice}`;

  // ===========| filter based on price range |===========
  priceInput.addEventListener("input", () => {
    const value = parseInt(priceInput.value); // priceInput.value alone is string
    priceValue.textContent = `value : $${value}`;
    let newStore = store.filter((product) => product.price / 100 <= value);
    display(newStore, getElement(".products-container"), true);
    // ===========| in case the price range doesn't match |===========
    if (newStore.length < 1) {
      getElement(
        ".products-container"
      ).innerHTML = `<h3 class="filter-error">Sorry, No products matching this price range</h3>`;
      return;
    }
  });
};

export default setupPrice;
