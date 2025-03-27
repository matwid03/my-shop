import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import { Categories } from './components/Categories';
import { FiltersSidebar } from './components/FiltersSidebar';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { products } from './const/products';
import { FiltersProvider } from './context/FiltersContext';

function App() {
	const location = useLocation();
	const isHomePage = location.pathname === '/' || location.pathname.startsWith('/mice') || location.pathname.startsWith('/keyboards') || location.pathname.startsWith('/headphones') || location.pathname.startsWith('/laptops');

	return (
		<>
			<Navbar />
			{isHomePage ? (
				<FiltersProvider>
					<Categories />
					<div className='flex'>
						<FiltersSidebar className='w-1/4' products={products} />
						<div className='w-3/4'>
							<Routes>
								<Route path='/' element={<HomePage />} />
								<Route path='/:category' element={<HomePage />} />
							</Routes>
						</div>
					</div>
				</FiltersProvider>
			) : (
				<Routes>
					<Route path='/cart' element={<CartPage />} />
					<Route path='/favourites' element={<FavouritesPage />} />
				</Routes>
			)}
		</>
	);
}

export default App;
