import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase";

export async function addToCart(userId, productId, setUser) {
  const userRef = doc(FIRESTORE_DB, 'users', userId);

  await updateDoc(userRef, {
    cart: arrayUnion(productId)
  });

  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    setUser((prevUser) => ({
      ...prevUser,
      cart: userData.cart
    }));
  }

}

export async function removeFromCart(userId, productId, setUser) {
  const userRef = doc(FIRESTORE_DB, 'users', userId);

  await updateDoc(userRef, {
    cart: arrayRemove(productId)
  });


  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    setUser((prevUser) => ({
      ...prevUser,
      cart: userData.cart
    }));
  }
}