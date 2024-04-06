import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProduct=createAsyncThunk('products/fetchProduct',async (id)=>{
    const {data}=await axios.get(`/api/product/${id}`);
    return data;
})

const productSlice=createSlice({
    name:"product",
    initialState:{
        product:{},
        loading:false,
        error:null,
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProduct.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
        })
        .addCase(fetchProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;          
        })
    }

})
export default productSlice.reducer;
