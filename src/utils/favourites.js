import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase';



export async function updateFavourites(userId, productId, action, setUser) {
  const userRef = doc(FIRESTORE_DB, 'users', userId);

  await updateDoc(userRef, {
    favourites: action === 'add' ? arrayUnion(productId) : arrayRemove(productId),
  });

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    setUser(prevUser => ({
      ...prevUser,
      favourites: userData.favourites,
    }));
  }
}
