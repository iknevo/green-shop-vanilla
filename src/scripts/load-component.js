import { mobileMenu } from "../main";
import { state } from "../state/state";

async function loadComponent(id, file) {
  const res = await fetch(file);
  const data = await res.text();
  document.getElementById(id).innerHTML = data;
}

export function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");

  const totalCount = state.cart.reduce((acc, item) => {
    return acc + (item.quantity || 1);
  }, 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalCount;

    if (totalCount === 0) {
      cartCountElement.classList.add("hidden");
    } else {
      cartCountElement.classList.remove("hidden");
    }
  }
}

async function initLayout() {
  await loadComponent("header", "/components/header.html");
  await loadComponent("footer", "/components/footer.html");

  mobileMenu();
  updateCartCount();
}

initLayout();
