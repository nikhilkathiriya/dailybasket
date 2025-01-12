import { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Breadcrumb from "../../component/breadcrumbs";
import BillingAddress from "./components/billingAddress";
import MiniCart from "../../component/miniCart";
import { updateUserDetails } from "../../redux/actions/profile";
import { updateUserInfo } from "../../redux/slices/userSlice";
import { checkCookie } from "../../common/cookie";
import { useNavigate } from "react-router";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validator = useRef(new SimpleReactValidator());
    const { userInfo } = useSelector((state) => state.user);
    const { cartInfo } = useSelector((state) => state.cart);
    const [, forceUpdate] = useState();
    const [address, setAddress] = useState({
        line_1: "",
        line_2: "",
        line_3: "",
        post_town: "",
        postcode: ""
    });
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        postcode: "",
        paymentDetails: {
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvv: ""
        },
        expireDate: {
            expireMM: "",
            expireYY: ""
        },
        scheduleDelivery: { deliver: false, often: 0, interval: 0 }
    });
    const element = document.getElementById("preloader");

    useEffect(() => {
        if (!checkCookie('dailyBasket') || !cartInfo.items.length) navigate('/')
    }, [])

    useEffect(() => {
        if (userInfo) {
            const { firstName, lastName, email, phone, address, postcode, paymentDetails } = userInfo;
            setState({
                ...state, firstName, lastName, email, phone, address, postcode, paymentDetails, expireDate: {
                    expireMM: paymentDetails?.expiryDate?.split('/')[0],
                    expireYY: paymentDetails?.expiryDate?.split('/')[1]
                }
            })
        }
    }, [userInfo])

    useEffect(() => {
        if (address.line_1 && address.postcode) {
            setState({
                ...state,
                address: address.line_1,
                postcode: address.postcode
            })
        }
    }, [address])

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            ...(name === "cardHolder" ||
                name === "cardNumber" ||
                name === "expiryDate" ||
                name === "cvv"
                ? {
                    paymentDetails: {
                        ...prevState.paymentDetails,
                        [name]: value
                    }
                }
                : name === "expireMM" ||
                    name === "expireYY"
                    ? {
                        expireDate: {
                            ...prevState.expireDate,
                            [name]: value
                        }
                    } : name === "deliver" ||
                        name === "often" ||
                        name === "interval"
                        ? {
                            scheduleDelivery: {
                                ...prevState.scheduleDelivery,
                                [name]: name === "deliver" ? Boolean(!state.scheduleDelivery.deliver) : Number(value) < 0 ? 1 : Number(value) >= 10 ? 10 : Number(value)
                            }
                        }
                        : { [name]: value }),
        }));
    }

    const updateDetails = (e) => {
        e.preventDefault();
        let { firstName, lastName, phone, address, postcode, paymentDetails, expireDate } = state;
        paymentDetails = {
            ...paymentDetails,
            expiryDate: expireDate.expireMM + "/" + expireDate.expireYY
        }
        element.style.display = 'block';
        if (validator.current.allValid()) {
            updateUserDetails({ updateFields: { firstName, lastName, phone, address, postcode, paymentDetails } }, (res) => {
                element.style.display = 'none'
                if (res.status === 200 || res.status === 201) {
                    dispatch(updateUserInfo(res.data.userDetails))
                    toast.success(res.data.message, { position: "top-right" });
                } else {
                    toast.error(res.data.message, { position: "top-right" });
                }
            })
        } else {
            element.style.display = 'none';
            validator.current.showMessages(true);
            forceUpdate(1);
        }
    }

    return <>
        <Breadcrumb title="Checkout" />
        <section className="shopify-cart checkout-wrap py-5">
            <div className="container-lg">
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <MiniCart isTotal={true} scheduleDelivery={state.scheduleDelivery} phoneNumber={state.phone} address={state.address}/>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <BillingAddress state={state} onHandleChange={onHandleChange} validator={validator} setAddress={setAddress} updateDetails={updateDetails} />
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Checkout;