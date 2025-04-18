import { products } from "../const/products";

export function getFilteredProducts(filters) {
  return products.filter((product) => {
    const matchesBrand = filters.brands.length === filters.brands.includes(product.brand);

    const matchesPrice = product.price <= filters.price;

    const matchesSearch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesBrand && matchesPrice && matchesSearch;
  });
}