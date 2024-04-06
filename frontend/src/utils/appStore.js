import {configureStore, createReducer} from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import userReducer from './userSlice'
const appStore=configureStore({
    reducer:{
        products:productsReducer,
        product:productReducer,
        cart:cartReducer,
        user:userReducer,
    },
})

export default appStore
