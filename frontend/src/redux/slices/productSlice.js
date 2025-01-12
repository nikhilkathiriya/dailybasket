import { createSlice } from '@reduxjs/toolkit';
import { product } from '../../common/constant';

const initialState = {
    productList: product,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // state.userInfo = action.payload;
            // state.cartId = action.payload.cartId
        },
    },
});

export const { productList } = productSlice.actions;
export default productSlice.reducer;
