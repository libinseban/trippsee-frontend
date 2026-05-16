import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/user/homePage";
import ContactPage from "../pages/main/ContactPage";
import Login from "../pages/user/signin";
import ForgotPassword from '../pages/user/forgetPassword';
import SignUp from "../pages/user/signUp";
import SellerPage from "../pages/seller/SellerPage";
import ResetPassword from '../pages/user/resetPassword';
import AdminPanel from "../pages/admin/AdminPanel";
import NotFoundPage from "../pages/main/NotFound";
import SellerSignup from '../pages/seller/SellerSignup';
import SellerLogin from "../pages/seller/sellerLogin";
import CartPage from "../pages/main/CartPage";
import Products from "../components/adminComponent/Products";
// import SellerDetails from "../pages/admin/sellerDetails";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
  
      {
        path: "admin/dashboard",
        element: (
          <ProtectedAdminRoute allowedRole="admin">
            <AdminPanel />
          </ProtectedAdminRoute>
        ),

       
        children: [
        
          
              { 
                path: "products", 
                element: <Products /> 
              },
              // { 
              //   path: "sellers", 
              //   element: <SellerDetails /> 
              // }
            ]
          }
        
      ,
      // Seller Routes
      {
        path: "seller",
        children: [
          {
            path: "signin",
            element: <SellerLogin />
          },
          {
            path: "signup",
            element: <SellerSignup />
          },
          {
            path: "dashboard",
            element: <SellerPage />
          }
        ]
      },
      // User Routes
          {
            path: "signin",
            element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "user",
        children: [
   
   
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
          }, {
            path: "cart",
           element: <CartPage />
          },
          
      ]
      },
      // Other Routes
      {
        path: "contact",
        element: <ContactPage />
      },
     
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
]);

export default router;