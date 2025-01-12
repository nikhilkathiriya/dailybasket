import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { updateUserDetails } from "../../../redux/actions/profile";
import SimpleReactValidator from "simple-react-validator";
import { updateUserInfo } from "../../../redux/slices/userSlice";
import PostcodeLookupComponent from '../../../component/postcodeLookup';

const MyProfile = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const validator = useRef(new SimpleReactValidator());
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
        }
    });
    const element = document.getElementById("preloader");

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

    return <div className="col-md-8 col-lg-9 col-xl-10 col-xxl-10">
        <section>
            <h5 className='p-3 border-dashed tab-description-heading'>Peronal Information</h5>
            <div className='card border-0 shadow-sm p-3 my-2'>
                <form id="form" className="form-group flex-wrap row">
                    <div className="col-lg-4 pb-3">
                        <label>First Name</label>
                        <input type="text" name="firstName" className="form-control" value={state.firstName} onChange={onHandleChange} />
                    </div>
                    <div className="col-lg-4 pb-3">
                        <label>Last Name</label>
                        <input type="text" name="lastName" className="form-control" value={state.lastName} onChange={onHandleChange} />
                    </div>
                    <div className="col-lg-4 pb-3">
                        <label>Email Address</label>
                        <input type="email" name="email" className="form-control" value={state.email} readOnly />
                    </div>
                    <div className="col-lg-4 pb-3">
                        <label>Phone Number</label>
                        <input type="text" name="phone" className="form-control" value={state.phone} onChange={onHandleChange} />
                        <span className="error-message">{validator.current.message('Phone Number', state.phone, 'phone')}</span>
                    </div>
                </form>
            </div>
        </section>
        <section>
            <h5 className='p-3 border-dashed tab-description-heading'>Contact Information</h5>
            <div className='card border-0 shadow-sm p-3 my-2'>
                <form id="form" className="form-group flex-wrap row">
                    <div className="col-lg-4 pb-3 find-address-section">
                        <label>Find My Address</label>
                        <PostcodeLookupComponent onAddressSelected={(address) => setAddress(address)} />
                    </div>
                    <div className="col-lg-4 pb-3">
                        <label>Address</label>
                        <input type="text" name="address" className="form-control" value={state.address} readOnly />
                    </div>
                    <div className="col-lg-4 pb-3">
                        <label>Postcode</label>
                        <input id="postcode" type="text" name="postcode" className="form-control" value={state.postcode} readOnly />
                    </div>
                </form>
                <div className='text-center'>
                    <button type='button' className="btn btn-primary text-uppercase" onClick={updateDetails}>Save</button>
                </div>
            </div>
        </section>
    </div>
}

export default MyProfile