import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import GoogleAuthButton from "../components/AuthenticationComponents/GoogleAuthButton";
import ForgotPassword from "../components/AuthenticationComponents/ForgotPassword";
import { verifyUser } from "../store/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth=useSelector(state=>state.auth.auth)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(auth.isLoggedIn){
      navigate("/");
    }
    
  },[])


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", { email, password });
      if (data?.success) {
        toast.success(data.msg);
        dispatch(verifyUser(data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };




  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-900">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-6">Sign in to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-500 transition flex justify-center items-center"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            

          </form>
          <ForgotPassword/>
            <GoogleAuthButton text="Login Using Google"/>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">Sign up now</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
