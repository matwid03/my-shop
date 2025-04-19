import { TrashIcon } from '@heroicons/react/24/outline';
import { AuthProvider } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { products } from '../const/products';
import { removeFromCart } from '../utils/cart';

export function CartPage() {
	const { user, setUser } = AuthProvider.useAuth();
	const [cartProducts, setCartProducts] = useState([]);

	useEffect(() => {
		if (user) {
			const productIds = user?.cart || [];
			const items = products.filter((product) => productIds.includes(product.id));
			setCartProducts(items);
		}
	}, [user]);

	const productsPrice = cartProducts.reduce((total, product) => total + product.price, 0);
	const deliveryCost = 59;
	const minSumForFreeDelivery = 1000;
	const isFreeDelivery = productsPrice >= minSumForFreeDelivery;
	const totalPrice = isFreeDelivery ? productsPrice : productsPrice + deliveryCost;

	const handleBtnClick = async (productId) => {
		setCartProducts((prev) => prev.filter((product) => product.id !== productId));
		await removeFromCart(user.uid, productId, setUser);
	};

	return (
		<div className='p-6'>
			<h1 className='text-3xl font-bold mb-6'>🛒 Twój koszyk</h1>

			{cartProducts.length === 0 ? (
				<p className='text-lg text-gray-600'>Twój koszyk jest pusty.</p>
			) : (
				<div className='flex flex-col md:flex-row gap-8'>
					<ul className='space-y-4 w-full md:w-2/3'>
						{cartProducts.map((product) => (
							<li key={product.id} className='flex items-center justify-between p-4 border rounded-xl shadow-md hover:shadow-lg transition'>
								<div className='flex items-center gap-4 cursor-pointer'>
									<img src={product.image} alt={product.name} className='w-20 h-20 object-contain' />
									<div>
										<h2 className='text-lg font-semibold'>{product.name}</h2>
										<p className='text-gray-700'>{product.price.toFixed(2)} zł</p>
									</div>
								</div>
								<button className='text-red-500 cursor-pointer hover:text-red-700 transition' onClick={() => handleBtnClick(product.id)}>
									<TrashIcon className='w-6 h-6' />
								</button>
							</li>
						))}
					</ul>

					<div className='w-full md:w-1/3 max-w-md border rounded-xl p-6 shadow-lg'>
						<h2 className='text-xl font-bold mb-4'> Podsumowanie</h2>

						<div className='flex justify-between text-lg'>
							<p>Wartość produktów:</p>
							<p>{productsPrice.toFixed(2)} zł</p>
						</div>

						<div className='flex justify-between text-lg'>
							<p>Koszt dostawy:</p>
							<p>{isFreeDelivery ? '0.00' : deliveryCost.toFixed(2)} zł</p>
						</div>

						<hr className='my-4' />

						<div className='font-bold flex justify-between text-xl'>
							<p>Do zapłaty:</p>
							<p>{totalPrice.toFixed(2)} zł</p>
						</div>

						{isFreeDelivery ? (
							<p className='text-green-600 text-center mt-4'>✔️ Darmowa dostawa!</p>
						) : (
							<p className='text-gray-600 text-center mt-4'>
								Darmowa dostawa od <strong>{minSumForFreeDelivery} zł</strong>
							</p>
						)}

						<button className='mt-6 w-full bg-gray-200 py-2 rounded-lg text-lg font-semibold cursor-pointer hover:bg-gray-400 transition'>Przejdź do zapłaty</button>
					</div>
				</div>
			)}
		</div>
	);
}
