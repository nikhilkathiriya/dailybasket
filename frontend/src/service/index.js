import axios from "axios";
import { deleteAllCookies, getCookie } from "../common/cookie";

const api = axios.create();
const statusCheck = {
    validateStatus: (status) => {
        if (status === 401) {
            // remove token from cookie unAuthorize
            deleteAllCookies()
            // window.location.reload(true)
        } else if (status === 500) {
            window.alert('Could not connect to server')
        } else {
            return true;
        }
    }
}

function onError(response) {
    return response;
}

function onSuccess(response) {
    console.log(response.config.url, 'Response ============', response.data)
    return response;
}

export const setToken = (token) => {
    axios.defaults.headers.common["Authorization"] = token;
    api.defaults.headers.common['Authorization'] = token;
}
export const removeToken = () => {
    api.defaults.headers.common['Authorization'] = '';
    axios.defaults.headers.common["Authorization"] = '';
}

api.defaults.baseURL = process.env.BACKEND_HOST;
api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.post["Accept"] = "*/*";
api.defaults.headers.common['Authorization'] = getCookie('dailyBasket') || ''

const baseUrl = {
    auth: '/api/auth/',
    user: '/api/user/',
    order: '/api/order/',
}

export const signUpService = {
    signUp: (data) => api.post(baseUrl.auth + `signup`, data, statusCheck).then(onSuccess, onError),
    signIn: (data) => api.post(baseUrl.auth + `login`, data, statusCheck).then(onSuccess, onError),
    sendVerifyEmail: (data) => api.post(baseUrl.auth + `verifyemail`, data, statusCheck).then(onSuccess, onError), // send verification code
    verifyCode: (data) => api.post(baseUrl.auth + `verifycode`, data, statusCheck).then(onSuccess, onError), // verify code
    resetPassword: (data) => api.post(baseUrl.auth + `resetpassword`, data, statusCheck).then(onSuccess, onError),

    getUserDetails: (data) => api.post(baseUrl.user + `get`, data, statusCheck).then(onSuccess, onError),
    updateUserDetails: (data) => api.post(baseUrl.user + `update`, data, statusCheck).then(onSuccess, onError),
    addProductToWishlist: (data) => api.post(baseUrl.user + `wishlist`, data, statusCheck).then(onSuccess, onError),

    createOrder: (data) => api.post(baseUrl.order + `create`, data, statusCheck).then(onSuccess, onError),
    getOrders: (data) => api.get(baseUrl.order, data, statusCheck).then(onSuccess, onError),
    getScheduledOrders: (data) => api.get(baseUrl.order + `scheduled`, data, statusCheck).then(onSuccess, onError),
    cancelOrder: (data) => api.post(baseUrl.order + `cancel`, data, statusCheck).then(onSuccess, onError),
    cancelScheduledOrders: (data) => api.post(baseUrl.order + `cancel-schedule`, data, statusCheck).then(onSuccess, onError),
}