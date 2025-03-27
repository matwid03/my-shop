import { createContext, useContext, useState } from 'react';
import { products } from '../const/products';

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
	const [selectedFilters, setSelectedFilters] = useState({
		brands: [],
		price: Math.max(...products.map((p) => p.price)),
	});

	return <FiltersContext.Provider value={{ selectedFilters, setSelectedFilters }}>{children}</FiltersContext.Provider>;
}

FiltersProvider.useFilters = function () {
	return useContext(FiltersContext);
};
