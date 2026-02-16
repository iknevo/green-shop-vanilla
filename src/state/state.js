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
  state.cart = [
    ...state.cart,
    { ...product, totalPrice: product.price * product.quantity }
  ];
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

export function removeFromCart(product) {
  const itemIndex = state.cart.findIndex((i) => i.id == product.id);
  state.cart.splice(itemIndex, 1);
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

export function clearCart() {
  state.cart = [];
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

export function handleQuantityChange(type, product) {
  const cartItem = state.cart.find((p) => p.id === product.id);

  if (cartItem) {
    if (type === "plus") {
      cartItem.quantity++;
    }

    if (type === "minus" && cartItem.quantity > 1) {
      cartItem.quantity--;
    }

    cartItem.totalPrice = cartItem.quantity * cartItem.price;
    localStorage.setItem("cart", JSON.stringify(state.cart));
  } else {
    if (type === "plus") {
      selectedQuantity++;
    }

    if (type === "minus" && selectedQuantity > 1) {
      selectedQuantity--;
    }
  }
}
