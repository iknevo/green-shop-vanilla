import { mobileMenu } from "../main";

async function loadComponent(id, file) {
  const res = await fetch(file);
  const data = await res.text();
  document.getElementById(id).innerHTML = data;
}

async function initLayout() {
  await loadComponent("header", "/components/header.html");
  await loadComponent("footer", "/components/footer.html");
  mobileMenu();
}
initLayout();
