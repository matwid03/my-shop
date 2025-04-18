import { TrashIcon } from '@heroicons/react/24/outline';
import { products } from '../const/products';
import { removeFromFavourites } from '../utils/favourites';
import { useEffect, useState } from 'react';
import { AuthProvider } from '../context/AuthContext';

export function FavouritesPage() {
	const { user, setUser, isLoading } = AuthProvider.useAuth();
	const [favouriteProducts, setFavouriteProducts] = useState([]);

	useEffect(() => {
		if (user) {
			const productIds = user?.favourites || [];
			const favs = products.filter((product) => productIds.includes(product.id));
			setFavouriteProducts(favs);
		}
	}, [user]);

	const handleRemove = async (productId) => {
		setFavouriteProducts((prev) => prev.filter((product) => product.id !== productId));
		await removeFromFavourites(user.uid, productId, setUser);
	};

	if (isLoading) {
		return <div className='p-4 text-center text-gray-600 font-bold'>Ładowanie ulubionych produktów...</div>;
	}

	if (!user) {
		return <div className='p-4 text-center text-gray-600 font-bold'>Zaloguj się, aby zobaczyć ulubione produkty.</div>;
	}
	return (
		<div className='p-4'>
			<h1 className='text-3xl font-bold mb-4'>Ulubione produkty</h1>
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
							<button onClick={() => handleRemove(product.id)} className='text-red-500 cursor-pointer hover:text-red-700'>
								<TrashIcon className='w-6 h-6' />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
