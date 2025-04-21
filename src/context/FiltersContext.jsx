import { createContext, useContext, useState } from 'react';
import { products } from '../const/products';

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
	const [selectedFilters, setSelectedFilters] = useState({
		brands: [],
		priceRange: {
			min: 0,
			max: Math.max(...products.map((p) => p.price)),
		},
		searchQuery: '',
	});

	const updateSearchQuery = (query) => {
		setSelectedFilters((prev) => ({
			...prev,
			searchQuery: query,
		}));
	};

	return <FiltersContext.Provider value={{ selectedFilters, setSelectedFilters, updateSearchQuery }}>{children}</FiltersContext.Provider>;
}

FiltersProvider.useFilters = function () {
	return useContext(FiltersContext);
};
