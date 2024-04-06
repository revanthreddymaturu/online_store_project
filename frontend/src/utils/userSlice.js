import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchUser=createAsyncThunk('/users/login',async (payload)=>{
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    console.log(payload)

    const {data}= await axios.post(
        '/api/users/login/',
        {username:payload.username, password:payload.password},
        // payload,
        config
    )
    return data;

})

export const registerUser=createAsyncThunk('/users/register',async (payload)=>{
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    const {data}= await axios.post(
        '/api/users/register/',
        {email:payload.email, password:payload.password,first_name:payload.first_name,last_name:payload.last_name},
        config
    )
    return data;
})

export const updateUser=createAsyncThunk('/users/update',async (payload, {getState})=>{
    const {user}=getState();
    const {token}=user.user
    const config={
        headers:{
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }
    const {data}= await axios.put(
        '/api/users/profile/update',
        {first_name:payload.first_name,last_name:payload.last_name,password:payload.password},
        config
    )
    return data;
})
const userInfoFromLocalStorage=JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null

const userSlice=createSlice({
    name:"user",
    initialState:{
        user:userInfoFromLocalStorage,
        loading:false,
        error:null,
    },
    reducers:{
        logoutUser:(state)=>{
            state.user=null;
            localStorage.removeItem('user');
            state.error=null;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
            state.error=null;
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
        .addCase(registerUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
            state.error=null;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
        .addCase(updateUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
            state.error=null;

        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
        
    }

})

export default userSlice.reducer
export const {logoutUser}=userSlice.actions