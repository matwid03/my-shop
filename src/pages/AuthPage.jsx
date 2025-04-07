import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const clearForm = () => {
		setEmail('');
		setPassword('');
		setUsername('');
		setErrorMessage('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isLogin) {
			await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
			navigate('/');
		} else {
			try {
				const userCredentials = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
				const user = userCredentials.user;

				await setDoc(doc(FIRESTORE_DB, 'users', user.uid), {
					email: user.email,
					username: username,
					favourites: [],
					cart: [],
					createdAt: new Date(),
				});

				await FIREBASE_AUTH.signOut();

				setEmail('');
				setPassword('');
				setUsername('');
				setIsLogin(true);
				setErrorMessage('');

				alert('Konto zostało utworzone. Zaloguj się.');
			} catch (error) {
				console.error(error);
				if (error.code === 'auth/email-already-in-use') {
					setErrorMessage('Podany e-mail jest już zajęty!');
				} else if (error.code === 'auth/weak-password') {
					setErrorMessage('Hasło powinno zawierać minimum 6 znaków!');
				} else if (error.code === 'auth/invalid-email') {
					setErrorMessage('Niepoprawny format adresu e-mail!');
				} else {
					setErrorMessage('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
				}
			}
		}
	};

	return (
		<div className='flex items-start justify-center pt-12 min-h-screen bg-gray-100'>
			<div className='bg-white rounded-xl p-8 w-full max-w-md shadow-lg'>
				<h1 className='text-2xl font-bold mb-12 text-center'>{isLogin ? 'Logowanie' : 'Rejestracja'}</h1>

				<form className='space-y-4' onSubmit={handleSubmit}>
					{!isLogin && <input className='w-full p-2 border rounded' type='text' placeholder='Nazwa użytkownika' required onChange={(e) => setUsername(e.target.value)} />}
					<input className='w-full p-2 border rounded' type='email' placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)} />
					<input className='w-full p-2 border rounded' type='password' placeholder='Hasło' value={password} required onChange={(e) => setPassword(e.target.value)} />

					<button className='w-full p-2 bg-gray-200 rounded-lg  text-lg cursor-pointer hover:bg-gray-400'>{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</button>
				</form>
				{errorMessage && <p className='text-red-600 text-center'>{errorMessage}</p>}

				<p className='mt-4 flex justify-center gap-2 text-lg'>
					{isLogin ? 'Nie masz jeszcze konta?' : 'Masz już konto?'}
					<button
						className='cursor-pointer text-blue-600 underline hover:text-blue-800'
						onClick={() => {
							setIsLogin((prev) => !prev);
							clearForm();
						}}>
						{isLogin ? 'Utwórz konto' : 'Zaloguj się'}
					</button>
				</p>
			</div>
		</div>
	);
}
