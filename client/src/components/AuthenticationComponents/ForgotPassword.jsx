import React, { useState } from "react";
import CustomModal from "../CustomModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnClick = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter valid email");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/forgot-password", { email });
      if (data?.success) {
        toast.success(data.msg);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="self-center cursor-pointer my-5">
      {/* Forgot Password Link */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-900 hover:underline focus:outline-none cursor-pointer"
      >
        Forgot Password?
      </button>

      {/* Modal Component */}
      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form className="text-center" onSubmit={handleOnClick}>
          <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
          <p className="text-gray-600 mb-4">
            Enter your email to receive a password reset link.
          </p>

          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 w-full rounded-lg mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded-lg transition flex items-center justify-center w-full ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin" size={20} /> : "Send Reset Link"}
          </button>
        </form>
      </CustomModal>
    </div>
  );
};

export default ForgotPassword;
