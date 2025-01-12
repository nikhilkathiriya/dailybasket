import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartId: null,
    cartInfo: {
        uid: "",
        cartID: "",
        items: []
    },
    orderDetails: "",
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartToUser: (state, action) => {
            state.cartInfo = {
                ...state.cartInfo,
                uid: action.payload
            }
        },
        generateCart: (state, action) => {
            state.cartId = action.payload
        },
        addToCart: (state, action) => {
            const { uid, cartID, items } = action.payload;
            let existingCart = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).cart)
            let cloneCart = { ...existingCart.cartInfo };
            cloneCart.uid = uid;
            cloneCart.cartID = cartID;
            if (cloneCart.items.length) {
                if (cloneCart.items.some(_ => _.product_id === items.product_id)) {
                    cloneCart.items = cloneCart.items.map((item) => {
                        if (item.product_id === items.product_id) {
                            Object.assign(item, { qty: Number(item.qty) + Number(items.qty) })
                            return item
                        } else {
                            return item
                        }
                    })
                } else {
                    cloneCart.items = [...cloneCart.items, items];
                }
            } else {
                cloneCart.items = [...cloneCart.items, items];
            }
            state.cartInfo = cloneCart;
        },
        removeCart: (state, action) => {
            state.cartId = null;
            state.cartInfo = {
                uid: "",
                cartID: "",
                items: []
            }
        },
        updateItemQty: (state, action) => {
            const { qty, pid } = action.payload;
            let existingCart = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).cart)
            let cloneCart = { ...existingCart.cartInfo };
            cloneCart.items = cloneCart.items.map((item) => {
                if (item.product_id === pid) {
                    Object.assign(item, { qty: Number(qty) })
                    return item
                } else {
                    return item
                }
            })
            state.cartInfo = cloneCart;
        },
        removeItem: (state, action) => {
            let existingCart = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).cart)
            let cloneCart = { ...existingCart.cartInfo };
            cloneCart.items = cloneCart.items.filter((item) => item.product_id !== action.payload)
            state.cartInfo = cloneCart;
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
        removeOrderDetails: (state, action) => {
            state.orderDetails = "";
        },
        afterOrderCartRemove: (state, action) => {
            state.cartId = null;
            state.cartInfo = {
                ...state.cartInfo,
                cartID: "",
                items: []
            }
        },
    },
});

export const { generateCart, addToCart, setCartToUser, removeCart, updateItemQty, removeItem, setOrderDetails, removeOrderDetails, afterOrderCartRemove } = cartSlice.actions;
export default cartSlice.reducer;
