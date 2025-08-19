import React, { useEffect, useContext } from 'react'
import Navbar from './Components/Navbar'
import Card from './Components/Card/card.jsx'
import { ProductContext } from './Components/Context/productContext'
import { fetchFromFirestore } from './firebase/Firebase'
import { Routes, Route } from 'react-router-dom'
import Details from './Components/Details/Details'
import MyAds from './Components/MyAds';
import EditAd from './Components/EditAd';

function App() {

  const { productData, setProductData } = useContext(ProductContext) || {};
  useEffect(() => {
    const getItems = async () => {
      const datas = await fetchFromFirestore()

      if (setProductData) {
        setProductData(datas);
      }
    }

    getItems()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Card items={productData || []} />
          </>
        } />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/my-ads" element={
          <>
            <Navbar />
            <MyAds />
          </>
        } />
        <Route path="/edit-ad/:id" element={
          <>
            <Navbar />
            <EditAd />
          </>
        } />
      </Routes>
    </>
  )
}

export default App