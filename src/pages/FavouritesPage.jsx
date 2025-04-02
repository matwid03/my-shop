import { TrashIcon } from '@heroicons/react/24/outline';

export function FavouritesPage() {
	const favouriteProducts = [
		{
			id: 18,
			name: 'Asus ROG Zephyrus G14',
			category: 'laptops',
			brand: 'Asus',
			price: 7299.99,
			image: 'laptop3.jpg',
		},
		{
			id: 15,
			name: 'Logitech G Pro X Wireless',
			category: 'headphones',
			brand: 'Logitech',
			price: 799.99,
			image: 'headphones5.jpg',
		},
		{
			id: 12,
			name: 'SteelSeries Arctis 7',
			category: 'headphones',
			brand: 'SteelSeries',
			price: 599.99,
			image: 'headphones2.jpg',
		},
	];

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4'>Ulubione produkty</h1>
			{favouriteProducts.length === 0 ? (
				<p>Brak ulubionych produktów.</p>
			) : (
				<ul className='space-y-4'>
					{favouriteProducts.map((product) => (
						<li key={product.id} className='flex items-center justify-between p-4 border rounded-lg shadow-md hover:shadow-lg'>
							<div className='flex items-center gap-4 cursor-pointer'>
								<img src={product.image} alt={product.name} className='w-16 h-16 object-contain' />
								<div>
									<h2 className='text-lg font-semibold'>{product.name}</h2>
									<p className='text-gray-700'>{product.price} zł</p>
								</div>
							</div>
							<button className='text-red-500 cursor-pointer hover:text-red-700'>
								<TrashIcon className='w-6 h-6' />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
