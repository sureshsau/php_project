import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import GoogleAuthButton from "../components/AuthenticationComponents/GoogleAuthButton";

const SignupPage = () => {
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    if(auth.isLoggedIn){
      navigate("/");
    }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setLoading(true);
    const { username, email, password, phoneNumber } = formData;

    if (!username || !email || !password || !phoneNumber) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
     if (!emailPattern.test(email)) {
          toast.error("Please enter a valid Gmail address (e.g., example@gmail.com)");
          setLoading(false)
          return;
      }
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axiosInstance.post("/auth/signup", formData);
      if (data?.success) {
        toast.success(data?.msg);
        //save this data in redux
        dispatch(registerUser({email:formData.email}))
        navigate("/verify-code");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-screen flex items-center justify-center">
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
            <p className="text-center text-gray-600 mb-6">Sign up to get started</p>

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-2 rounded-lg shadow-md text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              <GoogleAuthButton text="Signup using Google"/>

              <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
