import { Product } from '../components/Product';
import { products } from '../const/products';

export function HomePage({ selectedFilters }) {
	const filteredProducts = products.filter((product) => {
		const matchesBrand = selectedFilters.brands.length === 0 || selectedFilters.brands.includes(product.brand);
		const matchesPrice = product.price <= selectedFilters.price;
		return matchesBrand && matchesPrice;
	});

	return (
		<div className='grid grid-cols-3 gap-4 p-4'>
			{filteredProducts.map((product) => (
				<Product product={product} />
			))}
		</div>
	);
}
