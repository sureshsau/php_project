
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resendVerificationCode } from "../hooks/authHooks";
import { registerUser } from "../store/authSlice";

const EmailInput = ({handleSetTimer}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => setEmail(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const isSend = await resendVerificationCode(email);
      if (isSend) {
        console.log(email);
        dispatch(registerUser(email));
        handleSetTimer(300);
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded-lg text-white font-semibold transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default EmailInput;
