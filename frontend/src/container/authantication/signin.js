import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginImg } from "../../assets/images";
import Breadcrumb from "../../component/breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from '../../redux/actions/profile';
import { checkCookie, createCookie } from "../../common/cookie";
import { setToken } from "../../service";
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { setCartToUser } from "../../redux/slices/cartSlice";

const SignIn = () => {
    const dispatch = useDispatch();
    const { cartId } = useSelector((state) => state.cart);
    const validator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [state, setState] = useState({ email: "", password: "" });
    const element = document.getElementById("preloader");
    const navigate = useNavigate();

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }

    useEffect(() => {
        if (checkCookie('dailyBasket')) {
            navigate('/')
        }
    }, [])

    const authenticate = (e) => {
        e.preventDefault();
        const { email, password } = state;
        element.style.display = 'block';
        if (validator.current.allValid()) {
            dispatch(signIn({ email, password }, (res) => {
                element.style.display = 'none';
                if (res.status === 200) {
                    const { token, userDetails } = res.data;
                    if (token) {
                        createCookie(token, 'dailyBasket');
                        setToken(token)
                        toast.success('Login successfully!', { position: "top-right" });
                        if(cartId){
                            dispatch(setCartToUser(userDetails._id))
                            window.location.reload(true)
                        } else {
                            navigate("/");
                        }
                    }
                } else {
                    toast.error(res.data.message, { position: "top-right" });
                }
            })
            );
        } else {
            element.style.display = 'none';
            validator.current.showMessages(true);
            forceUpdate(1);
        }
    }

    return <>
        <Breadcrumb title="Sign In" isPath={true} />
        <section className="py-5 my-5">
            <div className="container-sm">
                <div className="row justify-content-center">
                    <div className="col-lg-6 d-flex align-items-end">
                        <img src={LoginImg} alt="Login" className="img-fluid" />
                    </div>
                    <div className="col-lg-6 p-5 bg-white border shadow-sm">
                        <h5 className="text-uppercase mb-3">Login</h5>
                        <label className="mb-3">Please enter your email address and password</label>
                        <form id="form" className="form-group flex-wrap">
                            <div className="col-12 pb-3">
                                <input type="email" name="email" placeholder="Email" className="form-control"
                                    value={state.email} onChange={onHandleChange} />
                                <span
                                    className="error-message">{validator.current.message('Email address', state.email, 'required|email')}</span>
                            </div>
                            <div className="col-12 pb-3">
                                <input type="password" name="password" placeholder="Password" className="form-control"
                                    value={state.password} onChange={onHandleChange} />
                                <span
                                    className="error-message">{validator.current.message('Password', state.password, 'required|min:5|max:20')}</span>
                            </div>
                            <div className="col-12 pb-3 text-right">
                                <Link to="/email-verification">Forgot password?</Link>
                            </div>

                            <button type="button" className="btn btn-primary text-uppercase w-100"
                                onClick={authenticate}>Log in
                            </button>
                            <label className="col-12 py-3 text-center text-uppercase w-100">or</label>
                            <Link to="/signup" className="btn btn-primary text-uppercase w-100">Create Account</Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default SignIn;