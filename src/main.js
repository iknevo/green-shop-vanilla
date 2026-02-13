import { getProducts } from "./scripts/api";
import { state } from "./state/state";

export function mobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const mobileMenuEl = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");

  if (!menuBtn || !closeBtn || !mobileMenuEl || !overlay) return;

  const openMenu = () => {
    mobileMenuEl.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
  };

  const closeMenu = () => {
    mobileMenuEl.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  };

  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
}

async function display_home_products() {
  const container = document.getElementById("home-products");
  if (!container) return;

  container.innerHTML = `
    <div class="flex items-center justify-center py-12.5 col-span-full">
      <div class="loader"></div>
    </div>
  `;

  try {
    const products = await getProducts();

    state.products = products;

    updateProducts();
  } catch (error) {
    container.innerHTML = `
      <p class="text-center text-red-600 font-semibold">
        ${error.message}
      </p>
    `;
  }
}

function updateProducts() {
  let result = [...state.products];

  if (state.activeFilter === "new") {
    result = result.filter((p) => p.new);
  } else if (state.activeFilter === "sale") {
    result = result.filter((p) => p.hasDiscount);
  }

  if (state.activeSort === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (state.activeSort === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  renderProducts(result);
}

function renderProducts(products) {
  const container = document.getElementById("home-products");
  if (!container) return;

  container.innerHTML = products
    .map(
      (p) => `
    <div class="group relative pb-10 md:pb-15 shadow-md rounded-sm overflow-hidden">
      
      <div class="relative overflow-hidden p-6 aspect-square">
        <img
          src="${p.image}"
          class="w-full h-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div class="bg-green-600 absolute top-0 left-0 px-4 py-2 font-semibold text-white uppercase ${!p.hasDiscount ? "hidden" : ""}">
        ${p.discount}% Off
      </div>

      <div class="px-4 py-2">
        <h3 class="mt-4 text-gray-700 text-xl font-semibold">
          ${p.name}
        </h3>

        <div class="flex items-center gap-2">
          <p class="font-semibold text-green-600">
            $${p.price}
          </p>

          <p class="font-semibold text-gray-400 line-through ${!p.hasDiscount ? "hidden" : ""}">
            $${p.oldPrice}
          </p>
        </div>
      </div>

      <button
        class="absolute bottom-0 left-1/2 -translate-x-1/2 md:opacity-0 md:translate-y-6 opacity-100 bg-green-600 text-white w-full text-center py-1 md:py-3 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 block rounded-sm cursor-pointer"
      >
        Order now
      </button>
    </div>
  `
    )
    .join("");
}

function initFilter() {
  const buttons = document.querySelectorAll(".product-filter");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) =>
        b.classList.remove("border-b-2", "border-green-600", "text-green-600")
      );

      btn.classList.add("border-b-2", "border-green-600", "text-green-600");

      state.activeFilter = btn.dataset.filter;

      updateProducts();
    });
  });
}

function initSorting() {
  const select = document.getElementById("product-sort-select");
  if (!select) return;

  select.addEventListener("change", (e) => {
    state.activeSort = e.target.value;
    updateProducts();
  });
}

async function init() {
  mobileMenu();
  initFilter();
  initSorting();
  await display_home_products();
}

init();
