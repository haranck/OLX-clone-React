import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase/Firebase";
import uploadImageToCloudinary from "../Cloudinary/imageUpload.jsx";

import { ProductContext } from "./Context/productContext.jsx";
import { getAuth } from "firebase/auth";

const Sell = ({ setModalSell }) => {
  console.log("Sell component is rendering");
  const { productData, setProductData } = useContext(ProductContext) || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [productName, setName] = useState("");
  const [productPrice, setPrice] = useState("");
  const [productCategory, setCategory] = useState("no-category");
  const [productDescription, setDescription] = useState("");

  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setSelectedImage(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("Submitting form for user:", user);

    if (!user) {
      alert("Please login to post your ad.");
      return;
    }

    if (
      !selectedImage ||
      !productName ||
      !productDescription ||
      !productPrice
    ) {
      alert("Please fill all the fields");
      return;
    }

    const newData = {
      title: productName.trim(),
      image: selectedImage,
      category: productCategory.trim(),
      description: productDescription.trim(),
      price: parseFloat(productPrice),
      createdAt: serverTimestamp(),
      userId: user.uid,
    };

    try {
      const docRef = await addDoc(collection(firestore, "Products"), newData);
      
      // Update local state with the new product
      if (setProductData) {
        const updatedProducts = Array.isArray(productData) 
          ? [...productData, { ...newData, id: docRef.id }] 
          : [{ ...newData, id: docRef.id }];
        setProductData(updatedProducts);
      }

      alert("Product added successfully!");
      setModalSell(false);
      navigate("/");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-auto p-6 relative">
        <button
          onClick={() => setModalSell(false)}
          className="absolute top-4 right-4 text-3xl font-semibold cursor-pointer"
        >
          &times;
        </button>

        <div className="bg-white py-4 px-6 shadow-sm mb-6 flex justify-center">
          <h1 className="text-2xl font-semibold text-gray-800">Post Your Ad</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-md h-72">
            {imageUploading ? (
              <span className="text-gray-500 text-lg">Uploading...</span>
            ) : selectedImage ? (
              <img
                src={selectedImage}
                alt="Preview"
                className="object-contain h-full w-full rounded"
              />
            ) : (
              <span className="text-gray-500 text-lg">Image Preview</span>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-1/2 flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Yamaha Helmet"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (INR)
              </label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 2500"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={productCategory}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Helmets"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write details about your item"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md resize-none"
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={imageUploading}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {imageUploading ? "Uploading Image..." : "Post Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell;
