import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductToWishlist, getUserDetails } from "../redux/actions/profile";
import { checkCookie } from "./cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/userSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { useMemo } from "react";
import { ageVerificationText, currencySymbol, getPriceCalculation, getProductDetail } from "./constant";

const ProductCard = ({ item, style, isWishlist = false }) => {
    const { _id, userInfo } = useSelector((state) => state.user);
    const { cartId } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const element = document.getElementById("preloader");

    const updateUserDetails = () => {
        getUserDetails({ user_id: _id }, (response) => {
            element.style.display = 'none'
            if (response.status === 200 || response.status === 201) {
                const { userDetails } = response.data
                dispatch(loginSuccess(userDetails))
            } else {
                toast.error(response.data.message, { position: "top-right" });
            }
        })
    }

    const onHandleWishlist = (pid) => {
        if (checkCookie('dailyBasket')) {
            element.style.display = 'block';
            addProductToWishlist({ productId: pid, action: userInfo?.wishList?.includes(pid) ? false : true }, (res) => {
                if (res.status === 200 || res.status === 201) {
                    if (!userInfo?.wishList?.includes(pid)) {
                        toast.success(res.data.message, { position: "top-right" });
                    }
                    updateUserDetails();
                } else {
                    element.style.display = 'none';
                    toast.error(res.data.message, { position: "top-right" });
                }
            })
        } else {
            element.style.display = 'none';
            toast.success('Please sign in to your Account to save items for later.', { position: "top-right" });
        }
    }

    const onHandleCart = (item) => {
        toast.success(`Product has been added to cart.`, { position: "top-right" });
        dispatch(addToCart({
            uid: _id ? _id : "",
            cartID: cartId,
            items: { product_id: item.id, qty: 1, price: Number(getPriceCalculation(item)) }
        }))
    }

    const updateHeart = useMemo(() => {
        return userInfo?.wishList?.includes(item.id) ?
            <svg onClick={() => onHandleWishlist(item.id)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 130.88 100.39">
                <path fill="#ed1b24" fillRule="evenodd" d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z" />
            </svg> : <svg onClick={() => onHandleWishlist(item.id)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 130.88 100.39" style={{ enableBackground: "new 0 0 122.88 109.57" }} xmlSpace="preserve">
                <g>
                    <path d="M65.46,19.57c-0.68,0.72-1.36,1.45-2.2,2.32l-2.31,2.41l-2.4-2.33c-0.71-0.69-1.43-1.4-2.13-2.09 c-7.42-7.3-13.01-12.8-24.52-12.95c-0.45-0.01-0.93,0-1.43,0.02c-6.44,0.23-12.38,2.6-16.72,6.65c-4.28,4-7.01,9.67-7.1,16.57 c-0.01,0.43,0,0.88,0.02,1.37c0.69,19.27,19.13,36.08,34.42,50.01c2.95,2.69,5.78,5.27,8.49,7.88l11.26,10.85l14.15-14.04 c2.28-2.26,4.86-4.73,7.62-7.37c4.69-4.5,9.91-9.49,14.77-14.52c3.49-3.61,6.8-7.24,9.61-10.73c2.76-3.42,5.02-6.67,6.47-9.57 c2.38-4.76,3.13-9.52,2.62-13.97c-0.5-4.39-2.23-8.49-4.82-11.99c-2.63-3.55-6.13-6.49-10.14-8.5C96.5,7.29,91.21,6.2,85.8,6.82 C76.47,7.9,71.5,13.17,65.46,19.57L65.46,19.57z M60.77,14.85C67.67,7.54,73.4,1.55,85.04,0.22c6.72-0.77,13.3,0.57,19.03,3.45 c4.95,2.48,9.27,6.1,12.51,10.47c3.27,4.42,5.46,9.61,6.1,15.19c0.65,5.66-0.29,11.69-3.3,17.69c-1.7,3.39-4.22,7.03-7.23,10.76 c-2.95,3.66-6.39,7.44-10,11.17C97.2,74.08,91.94,79.12,87.2,83.66c-2.77,2.65-5.36,5.13-7.54,7.29L63.2,107.28l-2.31,2.29 l-2.34-2.25l-13.6-13.1c-2.49-2.39-5.37-5.02-8.36-7.75C20.38,71.68,0.81,53.85,0.02,31.77C0,31.23,0,30.67,0,30.09 c0.12-8.86,3.66-16.18,9.21-21.36c5.5-5.13,12.97-8.13,21.01-8.42c0.55-0.02,1.13-0.03,1.74-0.02C46,0.48,52.42,6.63,60.77,14.85 L60.77,14.85z" />
                </g>
            </svg>
    }, [userInfo])

    const ageVerifictionValidation = (item) => {
        const productDetails = getProductDetail({ product_id: item.id })
        if (productDetails?.categoryId === 2 || productDetails?.categoryId === 3) {
            return <Link to={`/product?id=${item.id}`} className="btn btn-primary rounded-1 p-2 fs-7 w-100">
                Verify Your Age
            </Link>
        } else {
            return <span className="btn btn-primary rounded-1 p-2 fs-7 w-100 d-flex" style={{ alignItems: 'center', justifyContent: 'center' }} onClick={() => onHandleCart(item)}>
                <svg width="18" height="18">
                    <use xlinkHref="#cart"></use>
                </svg>
                &nbsp;
                Add to Cart
            </span>
        }
    }

    return <div key={item.name} className="product-item" style={style}>
        <figure>
            <Link to={`/product?id=${item.id}`} title={item.name}>
                <img src={item.image} alt="Product Thumbnail" className="tab-image" />
            </Link>
        </figure>
        <div className="d-flex flex-column text-center">
            <h3 className="fs-6 fw-normal" style={{ height: '40px' }}>{item.name}</h3>
            <div className="d-flex justify-content-center align-items-center gap-2">
                {item.discount !== 0 && <span className="text-dark fw-semibold"> {currencySymbol}{((item.unitPrice * (1 - item.discount / 100)).toFixed(2))}</span>}
                {item.discount ? <del>{currencySymbol}{item.unitPrice}</del> : <span className="text-dark fw-semibold">{currencySymbol}{item.unitPrice}</span>}
            </div>
        </div>
        <div className="product-card-footer">
            {ageVerifictionValidation(item)}
            {!isWishlist && updateHeart}
        </div>
    </div >
}

export default ProductCard;