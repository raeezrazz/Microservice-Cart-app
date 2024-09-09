import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RootState } from '../store/AuthStore';
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  userId: string;
  products: Product[];
}

const CartPage: React.FC = () => {
  
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any>([])
  const userId = useSelector((state: RootState) => state.auth.userId)
  

  const fetchCart = async ()=> {
    setLoading(true)

    try {
      const response = await axios.get(`http://localhost:4002/cart/${userId}`, {
        withCredentials: true
      })

      console.log(response.data.cartItems,'ressssssssssssssssssssssssssssssssssss')

      setCart(response.data.cartItems);

    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl mx-auto mt-6">
        <div className="flex justify-start items-center mb-6">
        <Link
            to="/"
            className="bg-gray-500 mr-6 mt-2 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center space-x-2"
          >
            <FaArrowLeft />
          </Link>
          <h2 className="text-4xl font-bold text-center text-gray-800">
            Your Cart
          </h2>
          
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : cart && cart.products.length > 0 ? (
          <div className="space-y-6 mb-6">
          {cart && cart.length === 0 && <p className="text-center text-gray-600">Your cart is empty.</p>}
          {cart && cart.products.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <img src='https://via.placeholder.com/100' alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default CartPage;
