import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEllipsisV,
  FaRegUserCircle,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { AiOutlineShop } from "react-icons/ai";
import  {useAuth}  from "../../controllers/AuthProvider";
import { useSellerAuth } from "../../controllers/sellerAuthContext";
import TopBar from "./TopBar";
import Logo from "./Logo";
import axios from "axios";
import { toast } from "react-hot-toast";
import Avatar from "../../utils/Avatar";
import Cookies from '../../helper/cookies';

const Header = () => {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth()
  const { isAuthenticated, setIsAuthenticated, logout } = useSellerAuth() || {};
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);


  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  
  const handleLogout = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    try {
      await axios.post(
        // 'https://tech-cart.onrender.com/api/user/logout',
        'http://localhost:8080/api/user/logout',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

  
      Cookies.remove("userToken");
      Cookies.remove("userId");
      setIsLoggedIn(false);
      setUser(null);
setIsAuthenticated(false)
      // Navigate to signin page
      navigate('/signin');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      
      setIsLoggedIn(false);
      setUser(null);
      navigate('/signin');
      
      toast.error('Logout encountered an issue. You have been logged out.');
    } 
  };

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      try {
        await logout();
        navigate('/seller/login');
      } catch (error) {
        toast.error('Logout failed');
      }
    }
  };

  const handleSellerClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/seller/dashboard');
    } else {
      navigate('/seller/signup');
    }
  };

  const handleSellerLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      toast.success('Seller logged out successfully');
      navigate('/seller/signin');
    } catch (error) {
      console.error('Seller logout failed:', error);
      toast.error('Logout failed');
    }
  };

  

  return (
<header className="h-23 shadow-md bg-white relative dark:bg-slate-950 text-black dark:text-white">
<TopBar />

<div className="mt-2 sm:mt-3 h-full container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-5 md:px-6 lg:px-2">  <div>
          <Logo />
        </div>
<div className="order-3 lg:order-none w-full lg:w-auto flex items-center border rounded-full focus-within:shadow pl-2 my-2 lg:my-5 lg:max-w-sm">         <input
            type="text"
            placeholder="Search products here..."
            className="w-full outline-none max-lg:text-base max-md:text-sm"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 hover:bg-red-700 dark:bg-red-700 bg-red-600 flex items-center rounded-r-full text-white max-md:min-w-[30px] max-md:h-5 max-md:text-base justify-center">
            <FaSearch className="md:mx-1" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <div className="flex items-center gap-2 sm:gap-4">
        {user ? (
              user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                    e.target.onerror = null;
                  }}
                />
              ) : (
                <Avatar
                  size="sm"
                  className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer hover:ring-2 hover:ring-red-500 hover:ring-offset-2 dark:hover:ring-offset-slate-900"
                />
              )
            ) : (
                <FaRegUserCircle className="w-4 h-4 sm:w-4 sm:h-4 md:w-6 md:h-6" />
            )}
        </div>

          <Link to="/user/cart">
          <div className="text-xl sm:text-2xl relative">
            <span>
              <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
          </div>
          </Link>
        </div>
        <div 
          onClick={handleSellerClick}
          className="flex justify-center cursor-pointer max-sm:hidden md:text-base lg:text-xl xl:text-2xl"
        >
          <AiOutlineShop className="mt-1" />
          <p className="text-xs sm:text-sm md:text-base lg:text-lg hover:text-red-700">
  {isAuthenticated ? 'Seller Dashboard' : 'Become a Seller'}
</p>
        </div>
        <div>
    {isAuthenticated ? (
<button 
  onClick={handleSellerLogout} 
  className="
  rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 
    text-sm lg:text-base 
    w-full max-w-[80px] max-h-[60px]
    px-2 py-1 lg:px-3 lg:py-2 
    text-center transition-all duration-200 ease-in-out 
    shadow-md hover:shadow-lg transform hover:scale-105"
>
  Seller Logout
</button>

    ) : (
      isLoggedIn ? (
        <button 
          onClick={handleLogout} 
          className="rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 w-full max-w-[150px] text-center px-1 py-1"
        >
          Log Out
        </button>
      ) : (
        <Link 
          to="/signin" 
          className="rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 w-full max-w-[150px] text-center px-1 py-1"
        >
          Sign In
        </Link>
      )
    )}
  </div>
        <div className="relative z-50" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-1 text-xl text-red-600 hover:text-red-800">
            <FaEllipsisV />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md dark:bg-slate-900 z-50 dark:text-white">
              <ul>
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/contacts" className="block px-4 py-2 text-red-700 hover:bg-red-100 hover:text-black dark:text-white dark:hover:bg-red-600 dark:hover:text-white">
                        Contact
                      </Link>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 hover:bg-red-100 hover:text-black dark:hover:bg-white">
                      <span className="text-red-700">Dark Mode</span>
                      <label className="relative cursor-pointer w-10 h-6 bg-gray-700 rounded-full flex items-center transition-colors duration-200 dark:bg-gray-600 hover:bg-black dark:hover:bg-black">
                        <input
                          type="checkbox"
                          checked={isDarkMode}
                          onChange={toggleDarkMode}
                          className="sr-only peer"
                        />
                        <span className="w-4 h-4 bg-white dark:bg-gray-300 rounded-full absolute left-1 top-1 peer-checked:bg-red-600 peer-checked:left-6 transition-all duration-300"></span>
                      </label>
                    </li>



                    <li>
                      <Link to="/wishlist" className="block px-4 py-2 text-red-700 hover:bg-red-200 w-full text-left hover:text-black dark:bg-red-600">
                        Wish List
                      </Link>
                      <img src=""></img>
                    </li>
                    <li>                   <Link
                      to="/help"
                      className="block px-4 py-2 text-red-700 hover:bg-red-200 w-full text-left hover:text-black"
                    >
                      Help
                    </Link></li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/help" className="block px-4 py-2 text-red-700 hover:bg-red-300 dark:hover:text-black">
                        Help
                      </Link>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 hover:bg-red-100 dark:hover:text-black">
                      <span className="text-red-700">Dark Mode</span>
                      <label className="relative cursor-pointer w-10 h-6 bg-gray-700 rounded-full dark:bg-gray-600 flex items-center hover:bg-black dark:hover:bg-gray-800 transition-colors duration-200">
                        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="sr-only peer" />
                        <span className="w-4 h-4 bg-white dark:bg-gray-300 rounded-full absolute left-1 top-1 peer-checked:bg-red-600 peer-checked:left-6 transition-all duration-300"></span>
                      </label>
                    </li>
                    <li className="block px-4 py-2 max-sm:flex max-sm:justify-center max-sm:w-full max-sm:text-center sm:hidden">
                      <Link to="/seller-login" className="flex items-center justify-center text-red-700 hover:bg-red-100 dark:hover:text-black">
                        <AiOutlineShop className="mr-2 text-lg" />
                        <p className="text-sm sm:text-base lg:text-lg xl:text-xl">Become a Seller</p>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
