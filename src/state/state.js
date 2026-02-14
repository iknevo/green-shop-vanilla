export const state = {
  products: [],
  activeFilter: "all",
  activeSort: "default",
  cart: [],
  currentPage: 1,
  productsPerPage: 6
};

export function addToCart(product) {
  state.cart = [...state.cart, { ...product, quantity: 1 }];
  localStorage.setItem("cart", JSON.stringify(state.cart));
}
