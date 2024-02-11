import { getElement } from "../utils.js";
import display from "../displayProducts.js";
const setupSearch = (store) => {
  const form = getElement(".input-form");
  // ===============| prevent re-loading |===============
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  // ===================================================
  const nameInput = getElement(".search-input");
  form.addEventListener("keyup", () => {
    const value = nameInput.value;
    // console.log(value);
    // ===============| in case input has no value |===============
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        if (name.startsWith(value)) {
          return product;
        }
      });
      //   console.log(newStore);
      display(newStore, getElement(".products-container"), true);
      // ===============| if search results return nothing |===============
      if (newStore.length < 1) {
        const products = getElement(".products-container");
        products.innerHTML = `<h3 class="filter-error">Sorry, no matching results</h3>`;
      }
    } else {
      display(store, getElement(".products-container"), true);
    }
  });
};

export default setupSearch;
