import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface CartState {
    cart: any,
}

const initialState: CartState = {
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isPresent = state.cart.findIndex((item: any) => item.id === action.payload.id);
            if (isPresent >= 0) {
                if (state.cart[isPresent].quantity < 5) {
                    state.cart[isPresent].quantity += 1;
                }
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item: any) => {
                return item?.id !== action.payload
            })
        },
        incrementQuantity: (state, action) => {
            state.cart = state.cart.map((item: any) => {
                return item.id === action.payload.id && item.quantity < 5
                    ? { ...item, quantity: item.quantity + 1 }
                    : item;
            });
        },
        decrementQuantity: (state, action) => {
            state.cart = state.cart.map((item: any) => {
                return item.id === action.payload.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item;
            });
        },
        clearAllCart: (state) => {
            state.cart = []
        }
    }
})

export const { addToCart, removeFromCart, decrementQuantity, incrementQuantity, clearAllCart } = cartSlice.actions;

export const getCart = (state: RootState) => state.cart.cart

export default cartSlice.reducer