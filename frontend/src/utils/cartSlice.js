import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import appStore from './appStore'
import axios from 'axios'

const cartItemsFromLocalStorage=JSON.parse(localStorage.getItem('cartItems'))?JSON.parse(localStorage.getItem('cartItems')):[]
const totalCartItemsFromLocalStorage=localStorage.getItem('totalItems')?localStorage.getItem('totalItems'):0
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:[...cartItemsFromLocalStorage],
        totalItems:parseInt(totalCartItemsFromLocalStorage),
    },
    reducers:{


        addItem:(state,action)=>{
            let flag=false;
            let product=null;
            (state.cartItems.map((item)=>{
                if(item.id===action.payload.id){
                    flag=true;
                    product=item;
                    return;
                }
               
            }))
            if(!flag){
                state.cartItems.push(action.payload);
            }
            else{
                const indexToUpdate = state.cartItems.findIndex(item => item.id === action.payload.id);


                state.cartItems=[...state.cartItems.slice(0,indexToUpdate),
                {...state.cartItems[indexToUpdate],"qty":parseInt(action.payload.qty)+parseInt(product.qty)},
                ...state.cartItems.slice(indexToUpdate+1)
                ]
            }
            state.totalItems=parseInt(action.payload.qty)+state.totalItems;
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            localStorage.setItem('totalItems',state.totalItems)

        },
        updateItemQty:(state,action)=>{
            let product=null;
            (state.cartItems.map((item)=>{
                if(item.id===action.payload.id){
                    product=item;
                    return;
                }
               
            }))
            
  
                const indexToUpdate = state.cartItems.findIndex(item => item.id === action.payload.id);
                if(product!=null){
                    const existingQty=parseInt(product.qty);
                    state.cartItems=[...state.cartItems.slice(0,indexToUpdate),
                        {...state.cartItems[indexToUpdate],"qty":parseInt(action.payload.qty)},
                        ...state.cartItems.slice(indexToUpdate+1)
                        ]
                    
                        state.totalItems=parseInt(action.payload.qty)+state.totalItems-existingQty;
                }
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
                localStorage.setItem('totalItems',state.totalItems)

       
        },

        deleteItem:(state,action)=>{
            state.cartItems=state.cartItems.filter((item=> item.id!==action.payload.id))
            state.totalItems-=parseInt(action.payload.qty);
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            localStorage.setItem('totalItems',state.totalItems)


        }
    },
    
})

export const {addItem,updateItemQty,deleteItem}=cartSlice.actions;
export default cartSlice.reducer;