import { useEffect } from 'react';

export function Toast({ message, onClose }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return <div className='pointer-events-none fixed top-20 right-6 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50'>{message}</div>;
}
