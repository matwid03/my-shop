import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function Navbar() {
	const [search, setSearch] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		console.log('Szukam:', search);
	};

	return (
		<nav className='flex justify-between items-center bg-gray-200 p-4 text-gray-600 '>
			<Link to='/'>
				<p className='text-4xl font-bold hover:text-gray-950'>My shop</p>
			</Link>
			<form onSubmit={handleSearch} className='flex gap-4'>
				<input className='w-6xl border-2 border-gray-400 rounded-lg p-2 focus:border-black focus:outline-none transition duration-200' type='text' placeholder='Wyszukaj w sklepie...' onChange={(e) => setSearch(e.target.value)} value={search} />
				<button type='submit' className='hover:cursor-pointer  hover:text-gray-950'>
					<MagnifyingGlassIcon className='w-10 h-10 ' />
				</button>
			</form>
			<div className='flex gap-8'>
				<Link to='/favourites'>
					<HeartIcon className='w-10 h-10 hover:text-gray-950 hover:border-2' />
				</Link>
				<Link to='/cart'>
					<ShoppingBagIcon className='w-10 h-10 hover:text-gray-950 hover:border-2' />
				</Link>
			</div>
		</nav>
	);
}
