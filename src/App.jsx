import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import { Categories } from './components/Categories';
import { FiltersSidebar } from './components/FiltersSidebar';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { products } from './const/products';
import { FiltersProvider } from './context/FiltersContext';
import { AuthPage } from './pages/AuthPage';
import { ProductPage } from './pages/ProductPage';

function App() {
	const location = useLocation();
	const isHomePage = location.pathname === '/' || location.pathname.startsWith('/mice') || location.pathname.startsWith('/keyboards') || location.pathname.startsWith('/headphones') || location.pathname.startsWith('/laptops');

	return (
		<FiltersProvider>
			<Navbar />

			<div className='h-[calc(100vh-132px)]'>
				{isHomePage ? (
					<>
						<Categories />

						<div className='flex h-full'>
							<FiltersSidebar className='w-1/4' products={products} />
							<div className='w-3/4 overflow-y-auto'>
								<Routes>
									<Route path='/' element={<HomePage />} />
									<Route path='/:category' element={<HomePage />} />
								</Routes>
							</div>
						</div>
					</>
				) : (
					<div className='h-[calc(100vh-76px)] overflow-y-auto'>
						<Routes>
							<Route path='/auth' element={<AuthPage />} />
							<Route path='/product/:id' element={<ProductPage />} />
							<Route path='/cart' element={<CartPage />} />
							<Route path='/favourites' element={<FavouritesPage />} />
						</Routes>
					</div>
				)}
			</div>
		</FiltersProvider>
	);
}

export default App;
