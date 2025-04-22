import { TrashIcon } from '@heroicons/react/24/outline';
import { AuthProvider } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { products } from '../const/products';
import { updateCart } from '../utils/cart';
import { Link } from 'react-router-dom';
import { Toast } from '../components/Toast';

export function CartPage() {
	const { user, setUser } = AuthProvider.useAuth();
	const [cartProducts, setCartProducts] = useState([]);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		if (user) {
			const cartItems = user.cart || [];

			const items = cartItems
				.map((cartItem) => {
					const product = products.find((p) => p.id === cartItem.id);
					if (!product) return null;
					return { ...product, quantity: cartItem.quantity };
				})
				.filter(Boolean);

			setCartProducts(items);
		}
	}, [user]);

	const productsPrice = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
	const deliveryCost = 59;
	const minSumForFreeDelivery = 1000;
	const isFreeDelivery = productsPrice >= minSumForFreeDelivery;
	const totalPrice = isFreeDelivery ? productsPrice : productsPrice + deliveryCost;

	const updateQuantity = async (productId, newQuantity) => {
		await updateCart(user.uid, productId, setUser, 'update', newQuantity);
	};

	const handleBtnClick = async (productId) => {
		setCartProducts((prev) => prev.filter((product) => product.id !== productId));
		await updateCart(user.uid, productId, setUser, 'remove');
		setShowToast(true);
	};

	if (!user) {
		return <div className='p-4 text-center text-gray-600 font-bold'>Zaloguj się, aby dodać produkty do koszyka.</div>;
	}

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
								<Link to={`/product/${product.id}`}>
									<div className='flex items-center gap-4 cursor-pointer'>
										<img src={product.image} alt={product.name} className='w-20 h-20 object-contain' />
										<div>
											<h2 className='text-lg font-semibold'>{product.name}</h2>
											<p className='text-gray-700'>{product.price.toFixed(2)} zł</p>
										</div>
									</div>
								</Link>
								<div className='flex items-center gap-4'>
									<h3>Ilość:</h3>
									<button className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300' onClick={() => updateQuantity(product.id, product.quantity - 1)}>
										-
									</button>
									<span>{product.quantity}</span>
									<button className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300' onClick={() => updateQuantity(product.id, product.quantity + 1)}>
										+
									</button>
									<button className='text-red-500 cursor-pointer hover:text-red-700 transition' onClick={() => handleBtnClick(product.id)}>
										<TrashIcon className='w-6 h-6' />
									</button>
								</div>
							</li>
						))}
					</ul>
					{showToast && <Toast message={'Usunięto z koszyka!'} onClose={() => setShowToast(false)} />}

					<div className='w-full md:w-1/3 max-w-md border rounded-xl p-6 shadow-lg sticky top-12 self-start h-fit'>
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
