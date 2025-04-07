import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB21MQOKJsarUau1RsjlccmsoOZ8q6DyyY",
  authDomain: "my-shop-b1f80.firebaseapp.com",
  projectId: "my-shop-b1f80",
  storageBucket: "my-shop-b1f80.firebasestorage.app",
  messagingSenderId: "19933456877",
  appId: "1:19933456877:web:990d2c13bc3e9c9c541fe4",
  measurementId: "G-3P9ST30Y20"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Błąd ustawiania persistence w Firebase:', error);
});

const db = getFirestore(app);

export { app, auth as FIREBASE_AUTH, db as FIRESTORE_DB };
