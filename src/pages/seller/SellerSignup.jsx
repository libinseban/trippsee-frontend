import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaStore, FaShoppingBag, FaChartLine, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SellerSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  // Add validation
  if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
    toast.error('Please fill in all required fields');
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  // Validate password length
  if (formData.password.length < 6) {
    toast.error('Password must be at least 6 characters long');
    return;
  }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post(
        'https://tech-cart.onrender.com/api/seller/signup',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success('Seller registered successfully!');
        navigate('/seller/signin');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const benefits = [
    { 
      icon: <FaStore className="text-3xl text-red-500" />, 
      text: "Join Our Growing Marketplace",
      description: "Be part of the fastest growing seller community"
    },
    { 
      icon: <FaShoppingBag className="text-3xl text-red-500" />, 
      text: "Sell to Millions of Customers",
      description: "Reach customers across the globe"
    },
    { 
      icon: <FaChartLine className="text-3xl text-red-500" />, 
      text: "Track Your Business Growth",
      description: "Monitor your success with detailed analytics"
    }
  ];

  const inputFields = [
    { name: 'name', type: 'text', placeholder: 'Full Name', icon: null },
    { name: 'email', type: 'email', placeholder: 'Email Address', icon: null },
    { name: 'password', type: showPassword ? 'text' : 'password', 
      placeholder: 'Password', icon: showPassword ? <FaEyeSlash /> : <FaEye />, onClick: () => setShowPassword(!showPassword)
    },
    { 
      name: 'confirmPassword', 
      type: showConfirmPassword ? 'text' : 'password', 
      placeholder: 'Confirm Password', 
      icon: showConfirmPassword ? <FaEyeSlash /> : <FaEye />,
      onClick: () => setShowConfirmPassword(!showConfirmPassword)
    },
    { name: 'address', type: 'text', placeholder: 'Business Address', icon: <FaMapMarkerAlt /> },
    { name: 'phoneNumber', type: 'tel', placeholder: 'Phone Number', icon: <FaPhone /> }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/tech-pattern.png')] opacity-10"></div>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 2,
            }}
            className={`absolute w-72 h-72 bg-red-500/20 rounded-full blur-3xl
              ${i === 0 ? 'top-0 left-0' : i === 1 ? 'bottom-0 right-0' : 'top-1/2 left-1/2'}`}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10 hover">
        {/* Left Side - Benefits */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto lg:mx-0"
          >
            <FaStore className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Start Your Business Journey
          </h1>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group overflow-hidden rounded-xl cursor-pointer"
              >
                {/* Image Background */}
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-32 object-cover object-center" 
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="relative p-6 flex items-start space-x-4 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div className="p-2 bg-red-500/10 rounded-lg transform transition-all duration-300 
            group-hover:bg-red-500/20 group-hover:scale-110">
  {benefit.icon}
</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-white transition-colors">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Seller Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {inputFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-red-500/30 
                             text-white placeholder-gray-300 outline-none focus:ring-2 
                             focus:ring-red-500 transition-all duration-200"
                    required
                  />
                  {field.icon && (
                    <div 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                      onClick={() => field.name === 'password' && setShowPassword(!showPassword)}
                    >
                      {field.icon}
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg 
                         font-medium text-lg transition-colors duration-200"
              >
                Create Account
              </motion.button>
            </form>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-gray-300"
            >
              Already have an account?{' '}
              <Link 
                to="/seller/signin"
                className="text-black hover:text-red-300 transition-colors duration-200"
              >
                Sign In
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellerSignup;