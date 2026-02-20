import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        product: "product.html",
        shop: "shop.html",
        cart: "cart.html",
        login: "login.html"
      }
    }
  }
});
