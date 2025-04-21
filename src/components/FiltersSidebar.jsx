import { useState } from 'react';
import { FiltersProvider } from '../context/FiltersContext';

export function FiltersSidebar({ products }) {
	const { selectedFilters, setSelectedFilters } = FiltersProvider.useFilters();

	const brands = [...new Set(products.map((p) => p.brand))];
	const maxPossiblePrice = Math.max(...products.map((p) => p.price));

	const [minPrice, setMinPrice] = useState(selectedFilters.priceRange?.min || 0);
	const [maxPrice, setMaxPrice] = useState(selectedFilters.priceRange?.max || maxPossiblePrice);
	const [priceError, setPriceError] = useState('');

	const handleFilterChange = (value) => {
		setSelectedFilters((prev) => {
			const updated = { ...prev };
			if (updated['brands'].includes(value)) {
				updated['brands'] = updated['brands'].filter((item) => item !== value);
			} else {
				updated['brands'] = [...updated['brands'], value];
			}
			return updated;
		});
	};

	const handleApply = () => {
		if (Number(minPrice) > Number(maxPrice)) {
			setPriceError('Cena minimalna nie może być większa niż maksymalna.');
			return;
		}

		if (Number(minPrice) < 0 || Number(maxPrice) > maxPossiblePrice) {
			setPriceError(`Wprowadź cenę z zakresu 0 - ${maxPossiblePrice} zł.`);
			return;
		}

		setPriceError('');
		setSelectedFilters((prev) => ({
			...prev,
			priceRange: {
				min: Number(minPrice),
				max: Number(maxPrice),
			},
		}));
	};

	const handleReset = () => {
		setSelectedFilters({
			brands: [],
			priceRange: { min: 0, max: maxPossiblePrice },
			searchQuery: '',
		});
		setPriceError('');
		setMinPrice(0);
		setMaxPrice(maxPossiblePrice);
	};

	return (
		<aside className='w-1/4 p-4 bg-gray-100'>
			<h2 className='text-lg font-bold mb-4'>Marka</h2>
			<div className='grid grid-cols-2 gap-2'>
				{brands.map((brand) => {
					const isChecked = selectedFilters.brands.includes(brand);
					return (
						<label
							key={brand}
							className={`cursor-pointer w-36 text-center px-4 py-2 rounded-full border transition
						${isChecked ? 'bg-black text-white border-black' : 'bg-white text-gray-800 border-gray-300 hover:border-black'}
					`}
							aria-checked={isChecked}>
							<input type='checkbox' value={brand} checked={isChecked} onChange={() => handleFilterChange(brand)} className='hidden' />
							{brand}
						</label>
					);
				})}
			</div>

			<div className='mt-6'>
				<h2 className='text-lg font-bold mb-2'>Cena (zł)</h2>
				<div className='flex gap-2 items-center mb-2'>
					<input type='number' className='w-full p-1 border rounded' value={minPrice} min={0} onChange={(e) => setMinPrice(e.target.value)} placeholder='Min' />
					<span>-</span>
					<input type='number' className='w-full p-1 border rounded' value={maxPrice} max={maxPossiblePrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder='Max' />
				</div>

				{priceError && <p className='text-red-500 text-sm mb-2'>{priceError}</p>}

				<div className='flex flex-col gap-2 mt-2'>
					<button onClick={handleApply} className='flex-1 bg-gray-700 text-white py-1 rounded cursor-pointer hover:bg-gray-800 '>
						Zastosuj
					</button>
					<button onClick={handleReset} className='flex-1 bg-gray-300 py-1 rounded cursor-pointer hover:bg-gray-400'>
						Resetuj
					</button>
				</div>
			</div>
		</aside>
	);
}
