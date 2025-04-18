import { products } from "./products";

export function getFilteredProducts(selectedFilters) {
  return products.filter((product) => {
    const matchesBrand = selectedFilters.brands.length === 0 || selectedFilters.brands.includes(product.brand);
    const matchesPrice = product.price <= selectedFilters.price;
    const matchesSearchQuery = product.name.toLowerCase().includes(selectedFilters.searchQuery.toLowerCase());

    return matchesBrand && matchesPrice && matchesSearchQuery;
  });
}