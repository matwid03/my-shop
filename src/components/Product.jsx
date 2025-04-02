import { HeartIcon } from '@heroicons/react/24/outline';

export function Product({ product }) {
	return (
		<div key={product.id} className='border p-4 rounded-lg shadow-xl cursor-pointer '>
			<HeartIcon className='w-10 h-10' />
			<img src={`${product.image}`} alt={product.name} className='w-full h-60 object-contain ' />
			<h2 className='text-lg font-bold'>{product.name}</h2>
			<p className='text-gray-700'>{product.price} zł</p>
		</div>
	);
}
