import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SellerAuthContext = createContext(null);

export const SellerAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState(null);

  const logout = async () => {
    try {
      const token = Cookies.get('sellerToken');
      if (token) {
        await axios.post('https://tech-cart.onrender.com/api/seller/logout', {}, {
          headers: {
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('sellerToken');
      setSeller(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const token = Cookies.get('sellerToken');
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        
        const response = await axios.get('https://tech-cart.onrender.com/api/seller/profile', {
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.seller) {
          setSeller(response.data.seller);
          setIsAuthenticated(true);
        } else {
          console.log('Invalid seller data:', response.data);
          setIsAuthenticated(false);
          setSeller(null);
          Cookies.remove('sellerToken');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        setIsAuthenticated(false);
        setSeller(null);
        Cookies.remove('sellerToken');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProfile();
  }, []);

  return (
    <SellerAuthContext.Provider 
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        seller,
        setSeller,
        logout, 
        loading 
      }}
    >
      {!loading && children}
    </SellerAuthContext.Provider>
  );
};

export const useSellerAuth = () => {
  const context = useContext(SellerAuthContext);
  if (!context) {
    throw new Error('useSellerAuth must be used within a SellerAuthProvider');
  }
  return context;
};