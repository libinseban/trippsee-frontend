import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from '../helper/cookies';

export const AuthContext = createContext(null);



export const AuthProvider = ({ children }) => {
    if (!children) {
        console.error("AuthProvider is missing children!");
        return null;
    }
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated,setIsAuthenticated]=useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userToken = Cookies.get('userToken');
                const userId=Cookies.get('userId')

                console.log("UserToken:", userToken);
                console.log("UserId:", userId);
                

                if (!userToken||!userId) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`https://tech-cart.onrender.com/api/user/profile`, 
                    {
                        headers: { Authorization: `Bearer ${userToken}` },
                        withCredentials: true, 
                    });

                if (response.data) {
                    setUser(response.data);
                    setIsLoggedIn(true);
                    setIsAuthenticated(true)
                }
                
                else {
                    setIsLoggedIn(false);
                    setIsAuthenticated(false)
                }
                
            } catch (error) {
                console.error('Auth check failed:', error);
                Cookies.remove('userToken');
                Cookies.remove('userId')
                setUser(null);
                setIsLoggedIn(false);
                setIsAuthenticated(false)
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
