export function FiltersSidebar({ selectedFilters, setSelectedFilters, products }) {
	const brands = [...new Set(products.map((p) => p.brand))];

	const maxPrice = Math.max(...products.map((p) => p.price));
	///cena apple
	const handleFilterChange = (type, value) => {
		setSelectedFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters };
			if (updatedFilters[type].includes(value)) {
				updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
			} else {
				updatedFilters[type] = [...updatedFilters[type], value];
			}
			return updatedFilters;
		});
	};

	const handlePriceChange = (event) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			price: Number(event.target.value),
		}));
	};

	return (
		<aside className='w-1/4 p-4 bg-gray-100'>
			<h2 className='text-lg font-bold mb-2'>Marka</h2>
			{brands.map((brand) => (
				<label key={brand} className='flex gap-2'>
					<input type='checkbox' value={brand} onChange={() => handleFilterChange('brands', brand)} checked={selectedFilters.brands.includes(brand)} />
					{brand}
				</label>
			))}

			<div className='mt-4'>
				<h2 className='text-lg font-bold mb-2'>Cena</h2>
				<input type='range' min={0} max={maxPrice} value={selectedFilters.price} onChange={handlePriceChange} className='w-full cursor-pointer' />
				<p className='text-center'>Maksymalna cena: {selectedFilters.price} zł</p>
			</div>
		</aside>
	);
}
