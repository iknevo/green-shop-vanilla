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
              <!-- <div -->
              <!--   class="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] items-center gap-3 bg-gray-100 py-2 px-4" -->
              <!-- > -->
              <!--   <div class="flex items-center gap-5"> -->
              <!--     <img -->
              <!--       src="https://via.placeholder.com/100" -->
              <!--       class="w-20 h-20 object-contain rounded-lg bg-gray-50" -->
              <!--     /> -->
              <!--     <div> -->
              <!--       <h3 class="text-lg font-semibold text-gray-800"> -->
              <!--         Begonia Plant -->
              <!--       </h3> -->
              <!--       <p class="text-sm text-gray-400">SKU-123456</p> -->
              <!--     </div> -->
              <!--   </div> -->
              <!---->
              <!--   <div class="text-gray-700 font-semibold text-lg">$75.00</div> -->
              <!---->
              <!--   <div class="flex items-center gap-4"> -->
              <!--     <button -->
              <!--       class="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300" -->
              <!--     > -->
              <!--       <i class="fa-solid fa-minus"></i> -->
              <!--     </button> -->
              <!--     <span class="text-lg font-semibold">1</span> -->
              <!--     <button -->
              <!--       class="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300" -->
              <!--     > -->
              <!--       <i class="fa-solid fa-plus"></i> -->
              <!--     </button> -->
              <!--   </div> -->
              <!---->
              <!--   <div class="flex items-center gap-4"> -->
              <!--     <div class="text-lg font-semibold text-gray-800">$75.00</div> -->
              <!---->
              <!--     <button -->
              <!--       class="text-red-500 hover:text-white hover:bg-red-500 cursor-pointer transition-all text-sm flex items-center justify-center h-10 w-10 rounded-full bg-gray-200" -->
              <!--     > -->
              <!--       <i class="fa-regular fa-trash-can"></i> -->
              <!--     </button> -->
              <!--   </div> -->
              <!-- </div> -->
            </div>

            <button
              class="btn-clear-cart self-end rounded-lg bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800 transition"
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
                <button
                  class="bg-green-600 px-8 text-white font-bold hover:bg-green-700 transition"
                >
                  Apply
                </button>
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
                  Proceed To Checkout
                </button>

                <a
                  href="/shop"
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
  cart.forEach((el) => {
    document.querySelector(".cart-products").insertAdjacentHTML(
      "beforeend",
      `

              <div
                class="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] items-center gap-3 border border-gray-200 py-2 px-4 rounded-md"
              >
                <div class="flex items-center gap-5">
                  <img
                    src="${el.image}"
                    class="w-20 h-20 object-contain rounded-lg"
                  />
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800">
                      ${el.name}
                    </h3>
                    <p class="text-sm text-gray-400">${el.sku}</p>
                  </div>
                </div>

                <div class="text-gray-700 font-semibold text-lg">$${el.price}</div>

                <div class="flex items-center gap-4">
                  <button
                    class="qty-btn w-9 h-9 rounded-full ${el.quantity === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300 "}"
                    data-type="minus"
                    data-id="${el.id}"
                  >
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="text-lg font-semibold">${el.quantity}</span>
                  <button
                    class="qty-btn w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300"
                    data-type="plus"
                    data-id="${el.id}"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>

                <div class="flex items-center gap-4">
                  <div class="text-lg font-semibold text-gray-800">$${el.totalPrice}</div>

                  <button
                    class="btn-remove-item text-red-500 hover:text-white hover:bg-red-500 cursor-pointer transition-all text-sm flex items-center justify-center h-10 w-10 rounded-full bg-gray-200"
                    data-id="${el.id}"
                  >
                    <i class="fa-regular fa-trash-can"></i>
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
