import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig"; // Path to your firebase configuration file
import { getAuth } from "firebase/auth";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { setCart } from "../redux/cartSlice";

export const addItemToCart = (item) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    const userDocRef = doc(fireDB, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    console.log("DATA OF THE USER IN THE CART ", userDoc.data().cart);
    await updateDoc(userDocRef, {
      cart: arrayUnion({
        ...item,
        quantity: 1,
      }),
    });
  }
  dispatch(addToCart(item));
};

export const removeItemFromCart = (asin) => async (dispatch, getState) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    const state = getState().cart;
    const item = state.find((item) => item.asin === asin);
    if (item) {
      const userDocRef = doc(fireDB, "users", user.uid);
      await updateDoc(userDocRef, {
        cart: arrayRemove(item),
      });
    }
  }
  dispatch(removeFromCart(asin));
};

export const increaseItemQuantity = (asin) => async (dispatch, getState) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    const state = getState().cart;
    const item = state.find((item) => item.asin === asin);
    if (item) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      const userDocRef = doc(fireDB, "users", user.uid);

      // Remove the old item and add the updated one
      await updateDoc(userDocRef, {
        cart: arrayRemove(item),
      });
      await updateDoc(userDocRef, {
        cart: arrayUnion(updatedItem),
      });
    }
  }
  dispatch(increaseQuantity(asin));
};

export const decreaseItemQuantity = (asin) => async (dispatch, getState) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    const state = getState().cart;
    const item = state.find((item) => item.asin === asin);
    if (item && item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      const userDocRef = doc(fireDB, "users", user.uid);

      // Remove the old item and add the updated one
      await updateDoc(userDocRef, {
        cart: arrayRemove(item),
      });
      await updateDoc(userDocRef, {
        cart: arrayUnion(updatedItem),
      });
    }
  }
  dispatch(decreaseQuantity(asin));
};

export const fetchCartData = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    const userDocRef = doc(fireDB, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userCart = userDoc.data().cart || [];
      dispatch(setCart(userCart));
    } else {
      console.error("No such user document!");
    }
  } else {
    console.error("No user is authenticated!");
  }
};
