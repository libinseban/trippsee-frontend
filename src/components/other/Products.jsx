import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthProvider';
import Cookies from '../../helper/cookies';

const API_BASE_URL = 'https://tech-cart.onrender.com/api/';
// const API_BASE_URL='http://localhost:8080/api/'



function Products({ category }) {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const [addingToCart, setAddingToCart] = useState({});


    const addToCart = async (productId) => {
        if (addingToCart[productId]) {
            console.log("Already adding this product to cart");
            return;
        }
    
        setAddingToCart(prev => ({ ...prev, [productId]: true }));
    
        try {
            console.log("Making API request to add to cart");
    
            if (!isLoggedIn || !user) {
                toast.error("Please log in to add items to the cart.");
                navigate('/signin');
                return;
            }
    
            const response = await axios.put(
                `${API_BASE_URL}user/cart/add`, 
                { productId, quantity: 1 },
                { withCredentials: true }
            );
    
            console.log("Add to cart response:", response.data);
    
            if (response.data?.message) {
                toast.success(response.data.message);
            } else {
                toast.error('Failed to add product to cart');
            }
    
        } catch (error) {
            console.error('Error:', error);
    
            if (error.code === 'ERR_NETWORK') {
                toast.error('Unable to connect to server. Please check your connection.');
            } else if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Session expired. Please login again.');
                        navigate('/signin', { replace: true });
                        break;
                    case 403:
                        toast.error('You do not have permission to add this item to cart.');
                        break;
                    default:
                        toast.error(error.response.data?.message || 'Failed to add product to cart');
                }
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } finally {
            setAddingToCart(prev => ({ ...prev, [productId]: false }));
        }
    };
    

    useEffect(() => {
        const fetchProducts = async () => {
          setError(null);
          try {
            console.log("Full API URL:", `${API_BASE_URL}user/products`);
            console.log("Fetching products for category:", category);
            const response = await axios.get(`${API_BASE_URL}user/products`, {
              params: { category },
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            });
            console.log("Full response:", response);
            console.log("Fetched products:", response.data);
            setProducts(response.data);
            setLoading(true);

          } catch (error) {
            console.error('Complete error object:', error);
            console.error('Error request:', error.request);
            console.error('Error message:', error.message);
            setError(error.response?.data?.message || 'Failed to load products. Please try again later.');
          }
        };
        fetchProducts();
      }, [category]);
      
  

    if (!loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product._id} className="p-4 bg-white shadow-lg rounded-lg ">
                    <img
                        src={product.productImages || 'fallback-image-url.jpg'}
                        alt={product.title}
                        className="w-full h-48 object-cover object-center rounded-t-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src='fallback-image-url.jpg'; }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-red-700">{product.title}</h3>
                        <p className="text-gray-700 dark:text-white">{product.description}</p>
                        <p className="text-red-600 font-bold">${product.price}</p>
                        <button 
    className={`mt-4 w-full bg-red-600 text-white py-2 px-4 rounded 
        hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 
        transition-colors duration-200 flex items-center justify-center
        ${addingToCart[product._id] ? 'opacity-75 cursor-not-allowed' : ''}`}
    onClick={() => addToCart(product._id)}
    disabled={addingToCart[product._id]}
>
    {addingToCart[product._id] ? (
        <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
        </div>
    ) : (
        <span>Add to Cart</span>
    )}
</button>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default Products;