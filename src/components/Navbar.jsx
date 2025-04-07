import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, HeartIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';

export function Navbar() {
	const [search, setSearch] = useState('');
	const { user } = useAuth();

	const handleSearch = (e) => {
		e.preventDefault();
		console.log('Szukam:', search);
	};

	const handleSignOut = () => {
		signOut(FIREBASE_AUTH);
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
				{user ? (
					<div className='flex items-center gap-2'>
						<UserIcon className='w-10 h-10 hover:text-gray-950 ' />
						<button onClick={handleSignOut} className='text-sm font-bold underline cursor-pointer hover:text-black'>
							Wyloguj
						</button>
					</div>
				) : (
					<Link to='/auth'>
						<UserIcon className='w-10 h-10 hover:text-gray-950 hover:border-2' />
					</Link>
				)}
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
