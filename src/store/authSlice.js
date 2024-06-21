import { createSlice } from "@reduxjs/toolkit";

// this file is to : track whether user is authenticated or not

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        }, 
        logout: (state) => {
            state.status = false;
        }
    }
})

export const {login, logout} = authSlice.actions // actions login logout function ko bolte h, reducer function ko
export default authSlice.reducer; 