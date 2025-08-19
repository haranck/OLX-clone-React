import { createContext, useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore
  useEffect(() => {
    setLoading(true);
    const q = query(collection(firestore, "Products"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setProductData(products);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to add a product (kept for backward compatibility)
  const addProduct = (product) => {
    return [...productData, product];
  };

  return (
    <ProductContext.Provider value={{ 
      productData, 
      setProductData,
      addProduct,
      loading 
    }}>
      {children}
    </ProductContext.Provider>
  );
};
