import {
  addToCart,
  handleQuantityChange,
  removeFromCart,
  state
} from "../state/state";
import { getProductBySlug } from "./api";
import { updateCartCount } from "./load-component";

const searchParams = new URLSearchParams(window.location.search);
const slug = searchParams.get("slug");

let selectedQuantity = 1;

async function display_product() {
  const container = document.getElementById("product-container");
  if (!container) return;

  container.innerHTML = `
    <div class="flex items-center justify-center py-12.5 col-span-full">
      <div class="loader"></div>
    </div>
  `;

  try {
    const product = await getProductBySlug(slug);
    // await new Promise((res) => setTimeout(res, 1000));

    state.product = product;

    updateProduct();
  } catch (error) {
    container.innerHTML = `
      <p class="text-center text-red-600 font-semibold">
        ${error.message}
      </p>
    `;
  }
}

function updateProduct() {
  const product = state.product;
  renderProduct(product);
}

function renderProduct(product) {
  const container = document.getElementById("product-container");
  if (!container) return;

  const inCart = state.cart.some((item) => item.id === product.id);
  const cartItem = state.cart.find((item) => item.id === product.id);
  if (cartItem) {
    selectedQuantity = cartItem.quantity;
  }

  container.innerHTML = `
      <div class="max-w-7xl mx-auto">
        <p class="text-sm md:text-base text-gray-500 mb-6 md:mb-10">
          <span class="font-semibold text-gray-700">Home</span>
          <span class="mx-2">/</span>
          Shop
          <span class="mx-2">/</span>
          <span class="text-gray-700">${product.name}</span>
        </p>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start"
        >
          <div
            class="bg-white rounded-xl shadow-sm p-6 md:p-10 flex items-center justify-center"
          >
            <img
              src="${product.image}"
              alt="ZZ Plant"
              class="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
            />
          </div>

          <div>
            <h1
              class="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800"
            >
              ${product.name}
            </h1>

            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4"
            >
              <div class="flex items-center flex-wrap gap-3">
                <p class="text-2xl md:text-3xl font-bold text-green-600">
                  $${product.price}
                </p>

                <p class="text-gray-400 line-through text-lg ${!product.hasDiscount ? "hidden" : ""}">$${product.oldPrice}</p>

                <span
                  class="bg-green-100 text-green-600 text-xs md:text-sm px-3 py-1 rounded-full font-semibold ${!product.hasDiscount ? "hidden" : ""}"
                >
                  ${product.discount}% OFF
                </span>
              </div>

              <div class="flex items-center gap-2 text-yellow-400 text-lg">
               <span class="text-gray-400">rating:</span> ${product.rating} ★
              </div>
            </div>

            <hr class="my-6" />

            <div>
              <h3 class="font-semibold text-gray-800 mb-2">Description :</h3>
              <p class="text-gray-600 leading-relaxed text-sm md:text-base">
                ${product.description}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center gap-6 mt-8">
              <div class="flex items-center gap-4">
                <button
                  class="qty-btn w-9 h-9 rounded-full bg-green-600 text-white text-lg"
                  data-type="minus"
                >
                  −
                </button>

                <span class="text-lg font-semibold"> ${selectedQuantity} </span>

                <button
                  class="qty-btn w-9 h-9 rounded-full bg-green-600 text-white text-lg"
                  data-type="plus"
                >
                  +
                </button>
              </div>

              <button
                data-type="${inCart ? "remove" : "add"}"
                class="btn-add-cart cursor-pointer w-full sm:w-auto ${inCart ? "bg-red-800 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white px-6 py-3 rounded-md font-semibold transition duration-300"
              >
                ${inCart ? "Remove From Cart" : "Add To Cart"}
              </button>
            </div>

            <div class="mt-10 text-gray-600 space-y-3 text-sm">
              <p>
                <span class="font-semibold text-gray-800">SKU :</span>
                ${product.sku}
              </p>

              <p>
                <span class="font-semibold text-gray-800">Category :</span>
                ${product.category}
              </p>

              <p>
                <span class="font-semibold text-gray-800">Tags :</span>
                ${product.tags.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>

  `;

  document.querySelector(".btn-add-cart").addEventListener("click", (e) => {
    if (e.target.dataset.type === "add") {
      addToCart({ ...product, quantity: selectedQuantity });
    } else if (e.target.dataset.type === "remove") {
      removeFromCart(product);
    }
    renderProduct(product);
    updateCartCount();
  });

  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const { type } = e.target.dataset;

      handleQuantityChange(type, product);
      updateCartCount();
      renderProduct(product);
    });
  });
}

async function init() {
  await display_product();
}
init();
