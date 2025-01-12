import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { LoginImg } from "../../assets/images";
import Breadcrumb from "../../component/breadcrumbs";
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { signUp } from "../../redux/actions/profile";
import { checkCookie } from "../../common/cookie";
import { Link } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const validator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [state, setState] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const element = document.getElementById("preloader");

    useEffect(() => {
        if (checkCookie('dailyBasket')) navigate('/')
    }, [])

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const authenticate = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = state;
        element.style.display = 'block'
        if (validator.current.allValid()) {
            signUp({ firstName, lastName, email, password }, (res) => {
                element.style.display = 'none'
                if (res.status === 200 || res.status === 201) {
                    toast.success(res.data.message, { position: "top-right" });
                    navigate('/login')
                } else {
                    toast.error(res.data.message, { position: "top-right" });
                }
            })

        } else {
            element.style.display = 'none'
            validator.current.showMessages(true);
            forceUpdate(1);
        }
    }

    return <>
        <Breadcrumb title="Create an Account" isPath={true} />
        <section className="py-5 my-5">
            <div className="container-sm">
                <div className="row justify-content-center">
                    <div className="col-lg-6 d-flex align-items-end">
                        <img src={LoginImg} alt="Account" className="img-fluid" />
                    </div>
                    <div className="col-lg-6 p-5 bg-white border shadow-sm">
                        <h5 className="text-uppercase mb-3">Create an Account</h5>
                        <form id="form" className="form-group flex-wrap">
                            <div className="col-12 pb-3">
                                <input type="text" name="firstName" placeholder="First Name" className="form-control"
                                    value={state.firstName} onChange={onHandleChange} />
                                <span
                                    className="error-message">{validator.current.message('First Name', state.firstName, 'required')}</span>
                            </div>
                            <div className="col-12 pb-3">
                                <input type="text" name="lastName" placeholder="Last Name" className="form-control"
                                    value={state.lastName} onChange={onHandleChange} />
                                <span
                                    className="error-message">{validator.current.message('Last Name', state.lastName, 'required')}</span>
                            </div>
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
                                    className="error-message">{validator.current.message('Password', state.password, 'required|min:5|max:10')}</span>
                            </div>
                            <button type="button" className="btn btn-primary text-uppercase w-100"
                                onClick={authenticate}>Create Account
                            </button>
                            <div className="col-12 pb-3 text-center">
                                Already have an account?{" "}
                                <Link to="/login"> Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default SignUp;