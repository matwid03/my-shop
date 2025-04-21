import { useParams } from 'react-router-dom';
import { Product } from '../components/Product';
import { products } from '../const/products';
import { FiltersProvider } from '../context/FiltersContext';

export function HomePage() {
	const { category } = useParams();
	const { selectedFilters } = FiltersProvider.useFilters();

	const filteredProducts = products.filter((product) => {
		const matchesCategory = !category || product.category.toLowerCase() === category;
		const matchesBrand = selectedFilters.brands.length === 0 || selectedFilters.brands.includes(product.brand);
		const matchesPrice = product.price >= selectedFilters.priceRange.min && product.price <= selectedFilters.priceRange.max;
		const matchesSearch = selectedFilters.searchQuery.trim() === '' || product.name.toLowerCase().includes(selectedFilters.searchQuery.toLowerCase());

		return matchesCategory & matchesBrand && matchesPrice && matchesSearch;
	});

	return (
		<div className='grid grid-cols-3 gap-4 p-4 '>
			{filteredProducts.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
}
