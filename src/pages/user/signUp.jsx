import React, { useState } from "react";
import loginIcons from "../../assest/page/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../controllers/AuthProvider";


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState(false);
      const {isLoggedIn,setIsLoggedIn, setUser} = useAuth();
  
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [imagePreview, setImagePreview] = useState(loginIcons);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (files.length > 0) {
        const newImage = files[0];
        setData((prev) => ({ ...prev, profilePic: newImage }));

        // Prevent memory leaks
        if (imagePreview !== loginIcons) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(URL.createObjectURL(newImage));
      }
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!data.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!data.firstName) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }
    if (!data.lastName) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) formData.append(key, data[key]);
    });

    try {
      const response = await axios.post(
        "https://tech-cart.onrender.com/api/user/signup",
        formData,
        { withCredentials: true }
      );

      if (response.data.message === "User already exists") {
        toast.error("User already exists. Please log in.");
      } else {
        toast.success(response.data.message || "User created successfully.");
        setIsLoggedIn(true)
        setUser(response.data)
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <section className="bg-gradient-to-r min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto container p-4">
        <div className="bg-white dark:bg-gray-800 p-8 w-full max-w-md mx-auto shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Create an Account
          </h2>

          <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-full shadow-lg mb-6">
            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
            <label className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs text-center cursor-pointer py-2 hover:bg-opacity-70 transition duration-300">
              Upload Photo
              <input type="file" className="hidden" onChange={handleOnChange} name="profilePic" accept="image/*" />
            </label>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {["firstName", "lastName", "email"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold mb-2 text-red-700 dark:text-red-400">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={`Enter your ${field}`}
                  name={field}
                  value={data[field]}
                  onChange={handleOnChange}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-red-300 dark:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}

            {["password", "confirmPassword"].map((field, index) => (
              <div key={field}>
                <label className="block text-sm font-semibold mb-2 text-red-700 dark:text-red-400">
                  {field === "confirmPassword" ? "Confirm Password" : "Password"}
                </label>
                <div className="relative">
                  <input
                    type={(index === 0 ? showPassword : repeatPassword) ? "text" : "password"}
                    placeholder={`Enter your ${field === "confirmPassword" ? "confirm password" : "password"}`}
                    name={field}
                    value={data[field]}
                    onChange={handleOnChange}
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-red-300 dark:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700 dark:text-gray-300"
                    onClick={() => (index === 0 ? setShowPassword(!showPassword) : setRepeatPassword(!repeatPassword))}
                  >
                    {index === 0 ? (showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />) : (repeatPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />)}
                  </div>
                </div>
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}

            <button type="submit" className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
