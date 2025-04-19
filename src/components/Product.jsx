import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { toggleFavourite } from '../utils/favourites';
import { AuthProvider } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Product({ product }) {
	const { user, setUser } = AuthProvider.useAuth();
	const [isFavourite, setIsFavourite] = useState(false);

	useEffect(() => {
		if (user) {
			setIsFavourite(user.favourites.includes(product.id));
		} else {
			setIsFavourite(false);
		}
	}, [user, product.id]);

	const handleFavouriteClick = async () => {
		if (!user) {
			alert('Zaloguj się, aby dodać do ulubionych!');
			return;
		}
		setIsFavourite(!isFavourite);

		await toggleFavourite(user.uid, product.id, isFavourite, setUser);
	};

	return (
		<Link to={`/product/${product.id}`}>
			<div key={product.id} className='border p-4 rounded-lg shadow-xl cursor-pointer relative'>
				<div
					className='absolute top-2 right-2'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						handleFavouriteClick();
					}}>
					{isFavourite ? <SolidHeartIcon className='w-8 h-8 text-red-500 hover:scale-110 transition' /> : <OutlineHeartIcon className='w-8 h-8 text-gray-400 hover:text-red-500 hover:scale-110 transition' />}
				</div>
				<img src={`${product.image}`} alt={product.name} className='w-full h-60 object-contain ' />
				<h2 className='text-lg font-bold'>{product.name}</h2>
				<p className='text-gray-700'>{product.price} zł</p>
			</div>
		</Link>
	);
}
