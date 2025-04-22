import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, HeartIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';
import { FiltersProvider } from '../context/FiltersContext';
import { AuthProvider } from '../context/AuthContext';

export function Navbar() {
	const { user } = AuthProvider.useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const [favNumber, setFavNumber] = useState(user?.favourites?.length || 0);
	const [cartNumber, setCartNumber] = useState(user?.cart?.length || 0);
	const { selectedFilters, updateSearchQuery } = FiltersProvider.useFilters();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setFavNumber(user?.favourites?.length);
			setCartNumber(user?.cart?.length);
		} else {
			setFavNumber(0);
			setCartNumber(0);
		}
		const close = (e) => {
			if (!e.target.closest('.menu-wrapper')) setShowMenu(false);
		};
		document.addEventListener('click', close);
		return () => document.removeEventListener('click', close);
	}, [user]);

	return (
		<nav className='flex flex-col md:flex-row justify-center xl:justify-between items-center bg-gray-200 p-4 text-gray-600 '>
			<Link to='/'>
				<p className='text-4xl font-bold hover:text-gray-950'>My shop</p>
			</Link>
			<form className='hidden xl:flex gap-4 w-1/2'>
				<input className='w-6xl border-2 border-gray-400 rounded-lg p-2 focus:border-black focus:outline-none transition duration-200' type='text' placeholder='Wyszukaj w sklepie...' onChange={(e) => updateSearchQuery(e.target.value)} value={selectedFilters.searchInput} />
				<button className='hover:cursor-pointer hover:text-gray-950' onClick={(e) => e.preventDefault()}>
					<MagnifyingGlassIcon className='w-10 h-10 ' />
				</button>
			</form>
			<div className='hidden animate-fade'></div>

			<div className='flex gap-8'>
				<div className='relative menu-wrapper'>
					<UserIcon className='w-10 h-10 hover:text-gray-950 cursor-pointer' onClick={() => setShowMenu((prev) => !prev)} />

					{showMenu && (
						<div className='absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white shadow-lg rounded-lg p-4 z-50 flex justify-center'>
							{user ? (
								<div>
									<p className='font-bold text-center mb-2'>{user.username}</p>
									<button
										onClick={() => {
											signOut(FIREBASE_AUTH);
											setShowMenu(false);
										}}
										className='cursor-pointer p-2 rounded-lg text-black bg-gray-400 hover:underline'>
										Wyloguj się
									</button>
								</div>
							) : (
								<button
									onClick={() => {
										setShowMenu(false);
										navigate('/auth');
									}}
									className='cursor-pointer p-2 rounded-lg text-black bg-gray-400 hover:underline'>
									Zaloguj się
								</button>
							)}
						</div>
					)}
				</div>
				<Link to='/favourites' className='relative'>
					<HeartIcon className='w-10 h-10 hover:text-gray-950 ' />
					<span className='absolute right-0 top-6  bg-red-500 text-white text-sm w-5 h-5 flex justify-center rounded-full'>{favNumber}</span>
				</Link>
				<Link to='/cart' className='relative'>
					<ShoppingBagIcon className='w-10 h-10 hover:text-gray-950 ' />
					<span className='absolute right-0 top-6  bg-black text-white text-sm w-5 h-5 flex justify-center rounded-full'>{cartNumber}</span>
				</Link>
			</div>
		</nav>
	);
}
