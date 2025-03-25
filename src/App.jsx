import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import { Categories } from './components/Categories';
import { FiltersSidebar } from './components/FiltersSidebar';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { useState } from 'react';
import { products } from './const/products';

function App() {
	const location = useLocation();
	const isHomePage = location.pathname === '/';
	const [selectedFilters, setSelectedFilters] = useState({
		brands: [],
		price: Math.max(...products.map((p) => p.price)),
	});

	return (
		<>
			<Navbar />
			{isHomePage ? (
				<>
					<Categories />
					<div className='flex'>
						<FiltersSidebar className='w-1/4' selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} products={products} />
						<div className='w-3/4'>
							<Routes>
								<Route path='/' element={<HomePage selectedFilters={selectedFilters} />} />
								<Route path='/mice' element={<HomePage selectedFilters={selectedFilters} />} />
								<Route path='/keyboards' element={<HomePage selectedFilters={selectedFilters} />} />
								<Route path='/headphones' element={<HomePage selectedFilters={selectedFilters} />} />
								<Route path='/laptops' element={<HomePage selectedFilters={selectedFilters} />} />
							</Routes>
						</div>
					</div>
				</>
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
