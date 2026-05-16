import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaStore } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSellerAuth } from '../../controllers/sellerAuthContext';

const SellerSignin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
const { isAuthenticated, setIsAuthenticated } = useSellerAuth() || {};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill out all fields');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('Attempting login with:', {
        email: formData.email,
        password: formData.password?.length > 0 ? '****' : 'empty'
      });
  
      const response = await axios.post(
        'https://tech-cart.onrender.com/api/seller/signin',
        {
          email: formData.email.trim(),
          password: formData.password.trim()
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
  
      // Log successful response
      console.log('Login response:', response.data);
  
      if (response.data.success) {
        setIsAuthenticated(true);
        toast.success('Login successful!');
        navigate('/seller/dashboard');
      } else {
        toast.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error details:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
  
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/tech-pattern.png')] opacity-10 bg-repeat"></div>
        <motion.div
          className="absolute -top-4 -left-4 w-24 h-24 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl relative z-10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center"
          >
            <FaStore className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Seller Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Or{' '}
            <Link to="/seller/signup" className="font-medium text-red-500 hover:text-red-400">
              create a new seller account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email} 
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                value={formData.password} 
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-800/50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/seller/forgot-password" className="font-medium text-red-500 hover:text-red-400">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SellerSignin;