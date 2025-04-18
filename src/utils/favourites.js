import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase';



export async function toggleFavourite(userId, productId, isFav, setUser) {
  const userRef = doc(FIRESTORE_DB, 'users', userId);

  await updateDoc(userRef, {
    favourites: isFav ? arrayRemove(productId) : arrayUnion(productId),
  });

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    setUser((prevUser) => ({
      ...prevUser,
      favourites: userData.favourites,
    }));
  }
}


export async function removeFromFavourites(userId, productId, setUser) {
  const userRef = doc(FIRESTORE_DB, 'users', userId);

  await updateDoc(userRef, {
    favourites: arrayRemove(productId)
  });

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    setUser((prevUser) => ({
      ...prevUser,
      favourites: userData.favourites,
    }));
  }
}
