// eslint-disable-next-line
import {signUpService} from "../../service";
import {jwtDecode} from "jwt-decode";
import {loginSuccess} from "../slices/userSlice";

// export function getUserDetail(data, next) {
//     return (dispatch, getState) => {
//         profileService.userDetail(data).then(response => {
//             switch (response?.status) {
//                 case 200:
//                     if (next) next(response)
//                     if (getState()?.user?.data?.slug === data?.slug) {
//                         dispatch({
//                             type: "SET_USER_DETAIL",
//                             payload: response?.data?.user
//                         })
//                     } else dispatch({
//                         type: "SET_OTHER_USER_DETAIL",
//                         payload: response?.data?.user
//                     })
//                     break;
//                 case 400:
//                     dispatch(ERROR(response?.error))
//                     if (next) next(response)
//                     break;
//                 default:
//                     break;
//             }
//         })
//     }
// }
//
// export function getLoginUserDetail(data, next) {
//     return (dispatch, getState) => {
//         profileService.loginUserDetail(data).then(response => {
//             switch (response?.status) {
//                 case 200:
//                     if (next) next(response)
//                     if (getState()?.user?.data?._id === response?.data?.user?._id) {
//                         dispatch({
//                             type: "SET_USER_DETAIL",
//                             payload: response?.data?.user
//                         })
//                     }
//                     break;
//                 case 400:
//                     dispatch(ERROR(response?.error))
//                     if (next) next(response)
//                     break;
//                 default:
//                     break;
//             }
//         })
//     }
// }


export function resetPassword(data, next) {
    signUpService.resetPassword(data).then(response => {
        if (next) next(response)
    })
}

export function sendVerifyEmail(data, next) {
    signUpService.sendVerifyEmail(data).then(response => {
        if (next) next(response)
    })
}

export function verifyCode(data, next) {
    signUpService.verifyCode(data).then(response => {
        if (next) next(response)
    })
}

export function signUp(data, next) {
    signUpService.signUp(data).then(response => {
        if (next) next(response)
    })
}

export function signIn(data, next) {
    return (dispatch, getState) => {
        signUpService.signIn(data).then(response => {
            switch (response.status) {
                case 200: {
                    const {userDetails, token} = response.data
                    dispatch(loginSuccess(userDetails))
                    if (next) next(response)
                    break
                }
                case 400: {
                    if (next) next(response)
                    break
                }
                default:
                    break

            }
        })
    }
}

export function getUserDetails(data, next) {
    signUpService.getUserDetails(data).then(response => {
        if (next) next(response)
    })
}

export function updateUserDetails(data, next) {
    signUpService.updateUserDetails(data).then(response => {
        if (next) next(response)
    })
}

export function addProductToWishlist(data, next) {
    signUpService.addProductToWishlist(data).then(response => {
        if (next) next(response)
    })
}

export function createOrder(data, next) {
    signUpService.createOrder(data).then(response => {
        if (next) next(response)
    })
}

export function getOrders(data, next) {
    signUpService.getOrders(data).then(response => {
        if (next) next(response)
    })
}

export function getScheduledOrders(data, next) {
    signUpService.getScheduledOrders(data).then(response => {
        if (next) next(response)
    })
}

export function cancelOrder(data, next) {
    signUpService.cancelOrder(data).then(response => {
        if (next) next(response)
    })
}

export function cancelScheduledOrders(data, next) {
    signUpService.cancelScheduledOrders(data).then(response => {
        if (next) next(response)
    })
}

// export function signOut(data, next) {
//     return (dispatch, getState) => {
//         signUpService.signOut(data).then(response => {
//             switch (response.status) {
//                 case 200: {
//                     dispatch({
//                         type: SET_SIGNOUT_USER,
//                         payload: {
//                             success: response?.data?.success,
//                             message: response?.data?.message
//                         }
//                     });
//                     if (next) next(response)
//                     break
//                 }
//                 case 400: {
//                     if (next) next(response)
//                     break
//                 }
//                 default:
//                     break
//
//             }
//         })
//     }
// }


// export function changePassword(data, next) {
//     profileService.changePassword(data).then(response => {
//         if (next) next(response)
//     })
// }
// export function createPassword(data, next) {
//     profileService.createPassword(data).then(response => {
//         if (next) next(response)
//     })
// }