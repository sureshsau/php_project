import { createSlice } from "@reduxjs/toolkit";

const auth = JSON.parse(localStorage.getItem("auth")) ||
 {id:"", username: "", isLoggedIn: false, email:"",profileImage:"",role:"user"};

const initialState = { auth };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
        //use in signup page
    registerUser: (state, action) => {
      const {email} = action.payload;
      const newAuthState = {id:"", username: "", isLoggedIn: false, email,profileImage:"",role:"user"};
      // Return new state (best practice)
      return { auth: newAuthState };
    },
    //verifyuser
    verifyUser:(state,action)=>{
        const user = action.payload;
        const newAuthState = {...user, isLoggedIn:true };
        localStorage.setItem("auth", JSON.stringify(newAuthState));  
        // Return new state (best practice)
        return { auth: newAuthState };
    },
    logout: (state) => {
      localStorage.removeItem("auth");
      return { auth: {id:"", username: "", email: "", isLoggedIn: false } };
    },
  },
});

export const { registerUser, logout,verifyUser } = authSlice.actions;
export default authSlice.reducer;
