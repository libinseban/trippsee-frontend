/** @format */

import React, { useEffect, useState } from "react";
import loginIcons from "../../assest/page/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../controllers/AuthProvider";
import Cookies from "../../helper/cookies";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
  const[admin,setAdmin]=useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please fill in both fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(
        "https://tech-cart.onrender.com/api/user/signin",
        // 'http://localhost:8080/api/user/signin',
        {
          email: data.email.trim(),
          password: data.password.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // const userData = await response.json();
      // console.log(userData);
      console.log(response.data);

      if (response.data?.success) {
        if (response.data.role === "Admin") {
          setAdmin(true)
          navigate("/admin/dashboard");
          Cookies.set('access_token',response.data.access_token)
          toast.success("Welcome Back Admin");

        } else if (response.data.role === "USER") {
          const userData = response.data;

          setUser(userData);
          setIsLoggedIn(true);

          // Cookies.set("userToken", response.data.userToken);
          // Cookies.set("userId", response.data.userId);  

          console.log("Navigating to homepage...");

          toast.success("Login successful!");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <section
      id="login"
      className="bg-gradient-to-br min-h-screen flex items-center justify-center"
    >
      <div className="bg-slate-100 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <img
            src={loginIcons}
            className="object-cover w-full h-full"
            alt="Login"
          />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-red-700 font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={data.email}
              onChange={handleOnChange}
              className="w-full px-3 py-2 pr-10 border border-red-500 dark:bg-slate-700 dark:border-red-400 dark:text-white outline-none focus:ring-2 focus:ring-red-300 text-black"
              required
              autoComplete="email"
            />
          </div>
          <div className="relative">
            <label className="text-red-700 font-semibold">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full px-3 py-2 pr-10 border border-red-500 dark:bg-slate-100 outline-none focus:ring-2 focus:ring-red-300 text-black"
                required
                autoComplete="current-password"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>

            <Link
              to="/forgot-password"
              className="block text-red-600 hover:underline mt-3 text-base text-right font-normal"
            >
              Forgot Password?
            </Link>
          </div>
          <button className="bg-red-600 text-white w-4/6 px-2 py-2 rounded-md dark:bg-red-600 dark:hover:bg-red-700 hover:bg-red-700 transition-colors duration-400 mx-auto font-medium shadow-md transform hover:scale-x-110">
            Log In
          </button>
        </form>
        <div className="flex px-7 mt-3 mx-auto">
          <p>Don't have an account..? </p>
          <Link
            to="/signup"
            className="text-red-700 hover:cursor px-3 font-semibold dark:hover:text-red-600"
          >
            Sign Up
          </Link>
        </div>
        <ToastContainer autoClose={2000} position="center"/>
      </div>
    </section>
  );
};

export default SignIn;
