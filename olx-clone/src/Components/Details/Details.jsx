
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../Navbar';

function Details() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [sellerName, setSellerName] = useState('Seller');

    useEffect(() => {
        const fetchItem = async () => {
            if (id) {
                const docRef = doc(firestore, 'Products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const productData = { ...docSnap.data(), id: docSnap.id };
                    setItem(productData);

                    if (productData.userId) {
                        try {
                            const userDoc = await getDoc(doc(firestore, 'users', productData.userId));
                            if (userDoc.exists() && userDoc.data().displayName) {
                                setSellerName(userDoc.data().displayName);
                            }
                        } catch (error) {
                            console.error('Error fetching user data:', error);
                        }
                    }
                }
            }
        };

        fetchItem();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className='w-full px-4 md:px-10 py-8'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    <div className='w-full lg:w-1/2 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-md h-72'>
                        <img src={item?.image} alt="Preview" className="object-contain h-full w-full rounded" />
                    </div>
                    <div className='w-full lg:w-1/2 flex flex-col justify-center'>
                        <h1 className='text-3xl font-semibold mb-6'>{item.title}</h1>
                        <p className='text-gray-600 text-sm mb-1'>{item.category}</p>
                        <p className='text-gray-500 text-xs'>{item.description}</p>
                        <div className="mt-4">
                            <p><span className="font-semibold">Price:</span> ₹{item.price}</p>
                            <p className="mt-2">
                                <span className="font-semibold">Seller:</span> {sellerName}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Listed on: {item?.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details;