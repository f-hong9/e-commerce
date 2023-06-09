import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state)=>{
            state.isFetching=true
        },
        loginSuccess: (state, action)=>{ // successful login
            state.isFetching=false;
            state.currentUser = action.payload
        },
        loginFailure: (state)=>{
            state.isFetching=false; // if username or password is wrong, or error in api
            state.error = true;
        }
    }
})

export const {loginStart, loginSuccess, loginFailure} = userSlice.actions
export default userSlice.reducer