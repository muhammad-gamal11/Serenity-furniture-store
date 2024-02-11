import { getStorageItem, setStorageItem } from "./utils.js";
let store = getStorageItem("store");
const setupStore = (products) => {
  store = products.map((product) => {
    // console.log(product);
    const {
      id,
      fields: { featured, name, price, company, colors, image },
    } = product;
    const img = image[0].thumbnails.large.url;
    return { id, featured, name, price, company, colors, img };
  });
  setStorageItem("store", store);
};

const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};
export { store, setupStore, findProduct };
