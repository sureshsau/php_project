import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { resendVerificationCode } from '../hooks/authHooks';
import { useDispatch, useSelector } from 'react-redux';
import {verifyUser}from '../store/authSlice'
import EmailInput from '../components/EmailInput';

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth.auth);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(auth.email?300:0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    console.log(auth);
    inputRefs.current[0]?.focus();
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(()=>{

  },[timer]);
  const handleInputChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify =async () => {
    if (otp.join('').length !== 6) {
      setError('Please enter all digits');
      return;
    }
    setIsVerifying(true);
    console.log(otp.join(''));
    try{
      const {data}=await axiosInstance.post('/auth/verify-user',{
        verificationCode:otp.join('')
      })
      if(data?.success){
        toast.success(data.msg);
        dispatch(verifyUser(data.user));
        navigate("/");
        return
      }
    }catch(error){
        toast.error(error.response?.data.msg || error);
    }finally{
      setIsVerifying(false)
    }
  };

  const handleResend =async () => {
    setOtp(Array(6).fill(''));
    setTimer(300);
    setError('');
    const isSend=await resendVerificationCode()
    inputRefs.current[0]?.focus();
  };
  const handleSetTimer=({time})=>{
    setTimer(time);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        {
          !auth.email?<EmailInput handleSetTimer={handleSetTimer}/>:null
        }
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Verification Code</h1>
          <p className="text-gray-600">Enter the 6-digit code sent to your device</p>
        </div>

        <div className="flex justify-center space-x-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-12 h-12 text-center text-2xl font-semibold border-2 rounded-lg focus:border-blue-500 focus:outline-none transition-colors
                ${error ? 'border-red-500' : 'border-gray-300'}
                ${success ? 'border-green-500' : ''}`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Time remaining: {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
          </p>
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.join('').length !== 6 || isVerifying}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors
            ${otp.join('').length === 6 && !isVerifying ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>

        <div className='flex justify-center'>
          <button
            onClick={handleResend}
            disabled={!auth.email || timer > 0}
            className={`text-sm font-medium transition-colors
              ${timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
          >
            Resend OTP
          </button>
        </div>

        <div className="text-center">
          <button onClick={() => navigate('/signup')} className="text-sm text-blue-600 hover:text-blue-700">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;
