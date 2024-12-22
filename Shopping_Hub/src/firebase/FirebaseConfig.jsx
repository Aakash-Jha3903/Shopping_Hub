import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpa4CVotS-rFlAZ-xkwvq8N2L9l9YpO3A",
  authDomain: "shopping-hub-4d626.firebaseapp.com",
  projectId: "shopping-hub-4d626",
  storageBucket: "shopping-hub-4d626.appspot.com",
  messagingSenderId: "643246290754",
  appId: "1:643246290754:web:87164d5cb09e63b4c0fadb",
  measurementId: "G-B8JFD4QDM5",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
