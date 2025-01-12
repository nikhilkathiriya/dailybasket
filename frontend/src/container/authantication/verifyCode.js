import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { LoginImg } from "../../assets/images";
import Breadcrumb from "../../component/breadcrumbs";
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { verifyCode } from "../../redux/actions/profile";
import { checkCookie } from "../../common/cookie";

const VerifyCode = () => {
    const navigate = useNavigate();
    const { verificationEmail } = useSelector((state) => state.user);
    const validator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [state, setState] = useState({ email: "", code: "" });
    const element = document.getElementById("preloader");

    useEffect(() => {
        if (checkCookie('dailyBasket')) navigate('/')
    }, []);

    useEffect(() => {
        setState({
            ...state,
            email: verificationEmail
        })
    }, [verificationEmail])

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const sendVerifyCode = (e) => {
        e.preventDefault();
        const { email, code } = state;
        element.style.display = 'block'
        if (validator.current.allValid()) {
            verifyCode({ email, code }, (res) => {
                element.style.display = 'none'
                if (res.status === 200 || res.status === 201) {
                    toast.success(res.data.message, { position: "top-right" });
                    navigate('/reset-password');
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
        <Breadcrumb title="Verify Code" isPath={true} />
        <section className="py-5 my-5">
            <div className="container-sm">
                <div className="row justify-content-center">
                    <div className="col-lg-6 d-flex align-items-end">
                        <img src={LoginImg} alt="Verify Code" className="img-fluid" />
                    </div>
                    <div className="col-lg-6 p-5 bg-white border shadow-sm">
                        <h5 className="text-uppercase mb-4">Verify Code</h5>
                        <form id="form" className="form-group flex-wrap">
                            <div className="col-12 pb-3">
                                <input type="email" name="email" placeholder="Email" className="form-control"
                                    value={state.email} onChange={onHandleChange} disabled/>
                                <span
                                    className="error-message">{validator.current.message('Email address', state.email, 'required|email')}</span>
                            </div>
                            <div className="col-12 pb-3">
                                <input type="text" name="code" placeholder="Verification Code" className="form-control"
                                    value={state.code} onChange={onHandleChange} />
                                <span
                                    className="error-message">{validator.current.message('Verification Code', state.code, 'required')}</span>
                            </div>
                            <div className="col-12">
                                <button type="button" className="btn btn-primary text-uppercase w-100"
                                    onClick={sendVerifyCode}>Verifiy Code
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default VerifyCode;