import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const companiesDOM = getElement(".companies");

const setupCompanies = (store) => {
  let companies = ["all", ...new Set(store.map((product) => product.company))];
  //   console.log(companies);
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join("");
  companiesDOM.addEventListener("click", (e) => {
    const element = e.target;
    if (element.classList.contains("company-btn")) {
      let newStore = [];
      if (element.textContent === "all") {
        newStore = [...store];
      } else {
        newStore = store.filter(
          (item) => item.company === e.target.textContent
        );
      }
      display(newStore, getElement(".products-container"), true);
    }
  });
};

export default setupCompanies;
