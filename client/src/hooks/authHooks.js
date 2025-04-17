import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

export const resendVerificationCode = async (email) => {
  if (!email) {
    toast.error("Please enter an email address");
    return false;
  }

  try {
    const { data } = await axiosInstance.post("/auth/resend-verification-code", { email });
    if (data?.success) {
      toast.success(data.msg);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error.response);
    toast.error(error.response?.data?.msg || "Something went wrong");
    return false;
  }
};
