import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const {data} = await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      if (data?.success) {
        toast.success(data.msg);
        navigate('/login');
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
      setPassword('')
      setConfirmPassword('');
    }
  };

  return (
    <Layout>
      <div className="flex h-screen w-screen justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Reset Your Password
          </h2>

          <label className="block mb-2 text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border px-4 py-2 w-full rounded-lg mb-4"
            placeholder="Enter new password"
          />

          <label className="block mb-2 text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border px-4 py-2 w-full rounded-lg mb-4"
            placeholder="Confirm new password"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
