import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProducts=createAsyncThunk('products/fetchProducts',async ()=>{
    const {data}=await axios.get('/api/products');
    return data;
})

const productsSlice=createSlice({
    name:"products",
    initialState:{
        products:[],
        loading:false,
        error:null,
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;          
        })
    }

})
export default productsSlice.reducer;
