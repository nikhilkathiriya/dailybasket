import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    userInfo: null,
    verificationEmail: null,
    userOrderDetails: [],
    userScheduledOrders: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.userInfo = action.payload;
            state._id = action.payload._id
        },
        logout: (state) => {
            state = initialState
        },
        setEmailForVerification: (state, action) => {
            state.verificationEmail = action.payload;
        },
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUserInfo: (state, action) => {
            state._id = null;
            state.userInfo = null;
            state.verificationEmail = null;
            state.userOrderDetails = [];
            state.userScheduledOrders = []
        },
        setUserOrderDetails: (state, action) => {
            state.userOrderDetails = action.payload;
        },
        setUserScheduledOrders: (state, action) => {
            state.userScheduledOrders = action.payload;
        },
    },
});

export const { loginSuccess, logout, setEmailForVerification, updateUserInfo, removeUserInfo, setUserOrderDetails, setUserScheduledOrders } = userSlice.actions;
export default userSlice.reducer;
