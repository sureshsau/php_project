import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { logout } from '../../store/authSlice';

const AuthButton = () => {
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth.auth);
  const handleLogout=async()=>{
    try{
      const {data}=await axiosInstance.post("/auth/logout");
      if(data?.success){
        toast.success(data.msg);
        dispatch(logout());
        return;
      }
    }catch(error){
      toast.error(error?.response?.data.msg||"something went wrong logout failed")
    }
  }

  return (
    auth.isLoggedIn?(
      <button onClick={handleLogout} className='cursor-pointer'><FiLogOut size={25}/></button>
    ):(
      <Link to='/login' className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md
    cursor-pointer hover:bg-blue-700 transition"
    >
          Login/Signup
    </Link>
    )
  )
}

export default AuthButton