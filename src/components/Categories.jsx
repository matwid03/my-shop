import { Link } from 'react-router-dom';
import { products } from '../const/products';

export function Categories() {
	const categories = [...new Set(products.map((product) => product.category))];
	console.log(categories);

	return (
		<nav className='flex justify-start items-center gap-2 bg-gray-300 p-4 text-gray-600'>
			{categories.map((category, index) => (
				<Link key={index} to={`/${category}`} className='font-bold hover:text-gray-950 hover:underline'>
					{category === 'keyboards' ? 'Klawiatury' : category === 'mice' ? 'Myszki' : category === 'headphones' ? 'Słuchawki' : category === 'laptops' ? 'Laptopy' : 'Monitory'}
				</Link>
			))}
		</nav>
	);
}
