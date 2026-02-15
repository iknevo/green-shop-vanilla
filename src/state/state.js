export const state = {
  products: [],
  product: {},
  activeFilter: "all",
  activeSort: "default",
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  currentPage: 1,
  productsPerPage: 6
};

export function addToCart(product) {
  state.cart = [...state.cart, { ...product, quantity: 1 }];
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

export function removeFromCart(product) {
  const itemIndex = state.cart.findIndex((i) => i.id == product.id);
  state.cart.splice(itemIndex, 1);
  localStorage.setItem("cart", JSON.stringify(state.cart));
}
