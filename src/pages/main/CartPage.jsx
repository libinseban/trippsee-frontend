import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthProvider';
import Cookies from '../../helper/cookies'

const CartPage = () => {
    const [cartData, setCartData] = useState({
        cart: null,
        products: [],
        totalPrice: 0,
        totalDiscountPrice: 0,
        totalItem: 0
    });
    const [error, setError] = useState(null);
    const [loading,setLoading]=useState(false)
    const {isLoggedIn,user} = useAuth();
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const userToken = Cookies.get('userToken');
            console.log("Retrieving cart with token:", userToken ? 'Token exists' : 'No token');
            if (!isLoggedIn||!user) {
                setError('Authentication token not found');
                navigate('/signin');
                return;
            }

            const response = await axios.get(
                // 'https://tech-cart.onrender.com/api/user/cart',
                'http://localhost:8080/api/user/cart',

                {
                    headers: { Authorization: `Bearer ${userToken}` },
                    withCredentials: true
                }
            );
            
            console.log("Cart API Response:", response.data);
            if (response.data && !response.data.cartItem) {
       
setCartData(response.data.cartItem || { cart: null, products: [], totalPrice: 0, totalDiscountPrice: 0, totalItem: 0 });

            } 
            setLoading(true)

        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to fetch cart');
            toast.error('Failed to fetch cart');
        }finally {
            setLoading(false);
        }
    }
    console.log("Is Authenticated:", isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            fetchCart();
        } else {
            navigate('/signin');
        }
    }, [isLoggedIn  , navigate]);

    const handleRemoveItem = async (productId) => {
        try {
            if (!productId) {
                toast.error('Invalid product ID');
                return;
            }

            const token = Cookies.get('userToken');
            if (!token) {
                toast.error('Please login to remove items from cart');
                navigate('/signin');
                return;
            }

            await axios.delete(
                `https://tech-cart.onrender.com/api/user/cart/remove/${productId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    },
                    withCredentials: true
                }
            );
            

            toast.success('Item removed from cart');
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error(error.response?.data?.message || 'Failed to remove item from cart');
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if (!productId) {
            toast.error('Invalid product');
            return;
        }
        
        if (newQuantity < 1) {
            toast.error('Quantity cannot be less than 1');
            return;
        }
    
        const userToken = Cookies.get('userToken');
        if (!userToken) {
            toast.error('Please login to update cart');
            navigate('/signin');
            return;
        }
    
        try {
            console.log("Sending token:", userToken); // Debugging
    
            await axios.put(
                // `https://tech-cart.onrender.com/api/user/cart/add`,
                'http://localhost:8080/api/user/cart/add',

                { 
                   productId,
                    quantity: newQuantity 
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
    
            toast.success('Cart updated successfully');
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error(error.response?.data?.message || 'Failed to update quantity');
        }
    };
    
    

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading your cart...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">{error}</h3>
                        <div className="mt-4">
                            <button
                                onClick={() => fetchCart()}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Shopping Cart ({cartData.totalItem || 0} items)
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        Continue Shopping
                    </button>
                </div>
                
                {!cartData.products?.length ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start adding some items to your cart!</p>
                            <div className="mt-6">
                                <button
                                    onClick={() => navigate('/')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Browse Products
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cartData.products.map((item) => (
                                <div key={item.product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row items-center gap-6">
                                            <div className="relative w-24 h-24 flex-shrink-0">
                                                <img 
                                                    src={item.product.productImages?.[0]} 
                                                    alt={item.product.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/placeholder.png';
                                                    }}
                                                />
                                                {item.product.discountPrice > 0 && (
                                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                                                        SALE
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                            {item.product.title}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                            {item.product.description}
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            Brand: {item.product.brand}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                                                            ₹{item.product.price}
                                                        </p>
                                                        {item.product.discountPrice > 0 && (
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                                                ₹{item.product.discountPrice}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                                                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/>
                                                            </svg>
                                                        </button>
                                                        <span className="w-8 text-center text-gray-600 dark:text-gray-400">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                                                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.product._id)}
                                                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Order Summary</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal ({cartData.totalItem} items)</span>
                                        <span className="text-gray-900 dark:text-white font-medium">₹{cartData.totalPrice || 0}</span>
                                    </div>
                                    {cartData.totalDiscountPrice > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Discount</span>
                                            <span className="text-green-500 font-medium">
                                                -₹{cartData.totalPrice - cartData.totalDiscountPrice}
                                            </span>
                                        </div>
                                    )}
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between">
                                            <span className="text-base font-medium text-gray-900 dark:text-white">Total</span>
                                            <span className="text-base font-medium text-gray-900 dark:text-white">
                                                ₹{cartData.totalDiscountPrice || cartData.totalPrice || 0}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            Shipping and taxes will be calculated at checkout
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/checkout')}
                                        className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                    >
                                        Proceed to Checkout
                                    </button>
                                    <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                                        or <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Continue Shopping</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;