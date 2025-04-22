import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase";

export async function updateCart(userId, productId, setUser, action, newQuantity = 1) {
  const userRef = doc(FIRESTORE_DB, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const currentCart = userSnap.data().cart || [];

  let updatedCart = [...currentCart];
  switch (action) {
    case 'add': {
      const existingItemIndex = updatedCart.findIndex((item) => item.id === productId);
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ id: productId, quantity: 1 });
      }
      break;
    }

    case 'remove':
      updatedCart = updatedCart.filter(item => item.id !== productId);
      break;

    case 'update': {
      updatedCart = currentCart
        .map(item => {
          if (item.id === productId) {
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean);
    }
  }

  await updateDoc(userRef, { cart: updatedCart });

  setUser((prevUser) => ({
    ...prevUser,
    cart: updatedCart
  }));
}
