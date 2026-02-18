import {
  clearCart,
  handleQuantityChange,
  removeFromCart,
  state
} from "../state/state";
import { updateCartCount } from "./load-component";

async function display_cart() {
  const container = document.getElementById("cart-container");
  if (!container) return;

  container.innerHTML = `
    <div class="flex items-center justify-center py-12.5 col-span-full">
      <div class="loader"></div>
    </div>
  `;

  try {
    updateCart();
  } catch (error) {
    container.innerHTML = `
      <p class="text-center text-red-600 font-semibold">
        ${error.message}
      </p>
    `;
  }
}

function updateCart() {
  const cart = state.cart;
  renderCart(cart);
}

function renderCart(cart) {
  const container = document.getElementById("cart-container");
  if (!container) return;

  container.innerHTML = `
      <div class="mb-10 text-gray-600 text-sm">
        <span class="font-semibold text-black">Home</span>
        <span> / Shop / Shopping Cart</span>
      </div>

      <section class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          <div class="flex flex-col gap-8">
            <div
              class="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-gray-200 py-6 font-semibold text-gray-700"
            >
              <span>Products</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            <div class="cart-products flex flex-col gap-2">
            </div>

            <button
              class="btn-clear-cart self-end rounded-lg bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800 transition ${cart.length > 0 ? "" : "hidden"}"
            >
              Clear Cart
            </button>
          </div>

          <div class="border border-gray-200 rounded-xl p-8 h-fit">
            <h2
              class="border-b border-gray-200 pb-6 text-xl font-bold text-gray-800"
            >
              Cart Totals
            </h2>

            <div class="mt-6">
              <p class="mb-2 text-gray-500 font-semibold">Coupon</p>

              <div
                class="flex overflow-hidden rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-green-500 transition"
              >
                <input
                  type="text"
                  placeholder="Enter your coupon ..."
                  class="flex-1 p-4 focus:outline-none"
                />
              </div>
            </div>

            <div class="mt-8 flex flex-col gap-6">
              <div class="flex justify-between">
                <span class="font-semibold text-gray-500">Subtotal</span>
                <span class="text-xl font-semibold text-gray-700">$75.00</span>
              </div>

              <div class="flex justify-between">
                <span class="font-semibold text-gray-500">Shipping</span>
                <span class="text-xl font-semibold text-gray-700">$30.00</span>
              </div>

              <div class="flex justify-between">
                <span class="font-semibold text-gray-500">Coupon Discount</span>
                <span class="text-xl font-semibold text-gray-700">
                  (-) $0.00
                </span>
              </div>

              <div
                class="mt-6 flex justify-between border-t border-gray-200 pt-6"
              >
                <span class="text-2xl font-bold text-gray-800">Total</span>
                <span class="text-2xl font-bold text-green-600"> $105.00 </span>
              </div>

              <div class="mt-8 flex flex-col gap-5 text-center">
                <button
                  class="rounded-lg bg-green-600 py-4 font-semibold text-white hover:bg-green-700 transition"
                >
                  Pay now
                </button>

                <a
                  href="/shop.html"
                  class="text-lg font-semibold text-green-600 hover:underline"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  `;
  if (cart.length === 0)
    document.querySelector(".cart-products").innerHTML = `
<div class="text-center">
  <h2 class="text-gray-800 md:text-2xl font-semibold mb-5">Your cart is empty, start by adding some products to your cart.</h2>
  <a href="/shop.html" class="text-lg font-semibold text-green-600 hover:underline">Got to shop.</a>
</div>

`;
  cart.length > 0 &&
    cart.forEach((el) => {
      document.querySelector(".cart-products").insertAdjacentHTML(
        "beforeend",
        `
<div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">

  <div class="flex gap-4">
    <img
      src="${el.image}"
      class="w-24 h-24 object-contain rounded-lg bg-gray-100 p-2"
    />
    <div class="flex flex-col justify-between flex-1">
      <div>
        <h3 class="text-base md:text-lg font-semibold text-gray-800">
          ${el.name}
        </h3>
        <p class="text-xs text-gray-400">${el.sku}</p>
      </div>

      <div class="text-gray-800 font-semibold text-lg md:hidden">
        $${el.price}
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between">

    <div class="hidden md:block text-gray-700 font-semibold text-lg">
      $${el.price}
    </div>

    <div class="flex items-center gap-4 px-4 py-2 rounded-full">
      <button
        class="qty-btn w-10 h-10 rounded-full ${
          el.quantity === 1
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-400"
        }"
        data-type="minus"
        data-id="${el.id}"
      >
        <i class="fa-solid fa-minus"></i>
      </button>

      <span class="text-lg font-semibold min-w-4 text-center">
        ${el.quantity}
      </span>

      <button
        class="qty-btn w-10 h-10 rounded-full hover:bg-gray-400 bg-gray-200 transition-all cursor-pointer"
        data-type="plus"
        data-id="${el.id}"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>

  <div class="flex items-center justify-between border-t pt-3">

    <div class="text-lg font-bold text-gray-900">
      Total: $${el.totalPrice}
    </div>

    <button
      class="btn-remove-item flex items-center gap-2 text-red-500 hover:bg-red-500 hover:text-white transition-all px-4 py-2 rounded-full bg-gray-100"
      data-id="${el.id}"
    >
      <i class="fa-regular fa-trash-can"></i>
      <span class="hidden sm:inline">Remove</span>
    </button>
  </div>

</div>
`
      );
    });

  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const { type, id } = e.target.closest(".qty-btn").dataset;
      const product = cart.find((pro) => String(pro.id) === String(id));

      handleQuantityChange(type, product);
      updateCart();
    });
  });
  document.querySelector(".btn-clear-cart").addEventListener("click", () => {
    clearCart();
    updateCart();
    updateCartCount();
  });
  document.querySelectorAll(".btn-remove-item").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const { id } = e.target.closest(".btn-remove-item").dataset;
      const product = cart.find((pro) => String(pro.id) === String(id));
      removeFromCart(product);
      updateCart();
      updateCartCount();
    })
  );
}

async function init() {
  await display_cart();
}
init();
