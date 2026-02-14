export async function getProducts() {
  try {
    const res = await fetch("/data/products.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to load products:", error);
    throw new Error(error);
  }
}

export async function getProductBySlug(slug) {
  try {
    const res = await fetch("/data/products.json");
    const products = await res.json();

    return products.find((p) => p.slug === slug);
  } catch (error) {
    console.error("Failed to load product:", error);
    throw new Error(error);
  }
}
