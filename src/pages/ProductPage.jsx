import { Link, useParams } from 'react-router-dom';
import { products } from '../const/products';
import { addToCart } from '../utils/cart';
import { AuthProvider } from '../context/AuthContext';
import { Toast } from '../components/Toast';
import { useState } from 'react';

export function ProductPage() {
	const { user, setUser } = AuthProvider.useAuth();
	const [showToast, setShowToast] = useState(false);
	const { id } = useParams();
	const product = products.find((p) => p.id === Number(id));

	const similarProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

	const handleBtnClick = async () => {
		if (!user) {
			alert('Zaloguj się, aby dodać do ulubionych!');
			return;
		}

		await addToCart(user.uid, product.id, setUser);
		setShowToast(true);
	};

	if (!product) {
		return <div className='text-center mt-10 text-red-500 font-bold'>Nie znaleziono produktu.</div>;
	}

	return (
		<div className='max-w-5xl mx-auto p-6'>
			<div className='flex flex-col md:flex-row gap-8 mb-16'>
				<img src={product.image} alt={product.name} className='w-full md:w-1/2 h-96 object-contain bg-white rounded-lg shadow-md hover:shadow-2xl transition' />
				<div className='flex flex-col justify-between md:w-1/2'>
					<div>
						<h1 className='font-bold text-3xl mb-4'>{product.name}</h1>
						<p className='text-lg text-gray-700 '>
							Marka: <span className='font-bold'>{product.brand}</span>
						</p>
					</div>
					<div>
						<p className='text-2xl text-green-700 font-bold mb-6'>{product.price}zł</p>
						<button className='bg-black text-white p-4 rounded-2xl cursor-pointer hover:bg-gray-800 transition ' onClick={handleBtnClick}>
							Dodaj do koszyka
						</button>
					</div>
				</div>
			</div>

			{showToast && <Toast message={'Dodano do koszyka!'} onClose={() => setShowToast(false)} />}

			{similarProducts.length > 0 && (
				<div>
					<h2 className='text-2xl font-bold mb-6'>Podobne produkty</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 '>
						{similarProducts.map((product) => (
							<Link to={`/product/${product.id}`} key={product.id} className='border p-4 rounded-lg shadow hover:shadow-xl transition'>
								<img src={product.image} alt={product.name} className='w-full h-40 object-contain mb-4' />
								<h3 className='font-semibold'>{product.name}</h3>
								<p className='text-gray-600'>{product.price}zł</p>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
