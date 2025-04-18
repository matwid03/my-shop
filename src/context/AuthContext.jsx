import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
			const isRegistering = localStorage.getItem('isRegistering') === true;

			if (isRegistering && firebaseUser) return;

			if (firebaseUser) {
				const docRef = doc(FIRESTORE_DB, 'users', firebaseUser.uid);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					const data = docSnap.data();
					setUser({ ...firebaseUser, ...data });
				} else {
					setUser(firebaseUser);
				}
			} else {
				setUser(null);
			}
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>;
}

AuthProvider.useAuth = function () {
	return useContext(AuthContext);
};
