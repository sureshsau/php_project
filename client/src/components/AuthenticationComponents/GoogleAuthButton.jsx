import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

import axiosInstance from "../../utils/axiosInstance";
import { verifyUser } from "../../store/authSlice";

const GoogleAuthButton = ({ text }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseGoogle = async (tokenResponse) => {
    try {
      console.log(tokenResponse);
      const { data } = await axiosInstance.post(`/auth/google/callback`,{code:tokenResponse.code});

      if (data?.success) {
        toast.success(data.msg);
        dispatch(verifyUser(data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Login failed, please try again");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: () => toast.error("Google authentication failed"),
    flow: "auth-code",
  });

  return (
    <button
      type="button"
      onClick={googleLogin}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition font-medium"
    >
      <FcGoogle className="text-2xl" />
      {text}
    </button>
  );
};

export default GoogleAuthButton;
