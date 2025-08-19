import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS2qXcdspCBv4dUOJx71hUCq6Ale9DUkM",
  authDomain: "olx-clone-7f906.firebaseapp.com",
  projectId: "olx-clone-7f906",
  storageBucket: "olx-clone-7f906.firebasestorage.app",
  messagingSenderId: "629586388371",
  appId: "1:629586388371:web:6377126e29077e78997466",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
const firestore = getFirestore(app);

const fetchFromFirestore = async () => {
  try {
    const productsCollection = collection(firestore, "Products");
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched products from Firestore:", productList);
    return productList;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return [];
  }
};

export { app, auth, googleProvider, storage, firestore, fetchFromFirestore };
