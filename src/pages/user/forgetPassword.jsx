import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tech-cart.onrender.com/api/user/forget-password",
        { email })
        .then(res => {
          console.log("login" + res.data)
          if (res.data.role === "admin")
          { navigate("/dashboard") } else {
            navigate("/login")
          }
      })
    } catch (error) {
      console.error("Error response:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white-600 p-5 w-full max-w-sm mx-auto">
          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Reset Password</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e)=>setEmail(e.target.value)}
                  name="email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
             
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="bg-red-600 text-white w-full px-5 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Log In
            </button>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={2000}/> 
    </section>
  );
};

export default ForgotPassword;
