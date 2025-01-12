import { Link, useNavigate } from "react-router-dom";
import { Login, Logo } from "../../assets/images";
import { checkCookie, deleteAllCookies } from "../cookie";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCart, removeCart, removeOrderDetails } from "../../redux/slices/cartSlice";
import { generateRandomCode } from "../generateCart";
import { removeUserInfo } from "../../redux/slices/userSlice";
import MiniCart from "../../component/miniCart";
import { toast } from 'react-toastify';
import { category } from "../constant";

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { cartId, cartInfo } = useSelector((state) => state.cart);

    useMemo(() => {
        if (!cartId?.length) {
            dispatch(generateCart(generateRandomCode()))
        }
    }, [])

    const signOut = async () => {
        await deleteAllCookies();
        await dispatch(removeUserInfo())
        await dispatch(removeOrderDetails())
        if (cartInfo.uid) {
            await dispatch(removeCart())
        }
        await window.location.reload(true)
    }

    return (
        <div className="header-container">
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart">
                <div className="offcanvas-header justify-content-center">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="order-md-last">
                        <MiniCart />
                        <button type="button" className="w-100 btn btn-primary btn-lg" onClick={() => navigate('/cart')} data-bs-dismiss="offcanvas" aria-label="Close">View Cart</button>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">
                <div className="offcanvas-header justify-content-between">
                    <h4 className="fw-normal text-uppercase fs-6 mb-0">Menu</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                        {category.map((item) => {
                            return <li className="nav-item border-dashed active">
                                <button type="button" onClick={() => navigate(`/category?id=${item.id}`)} data-bs-dismiss="offcanvas" aria-label="Close" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                                    <img src={item.image} className="rounded-circle" alt="Category Thumbnail" style={{ display: 'unset', width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }} />
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        })}
                    </ul>
                </div>
            </div>

            <header>
                <div className="container-fluid">
                    <div className="row py-3 border-bottom">
                        <div className="col-6 col-md-6 col-lg-6 text-center text-sm-start d-flex gap-3 justify-content-center justify-content-md-start">
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <use xlinkHref="#menu"></use>
                                </svg>
                            </button>
                            <div className="my-3 my-sm-0">
                                <Link to="/" className="d-flex align-items-center nav-link">
                                    <img src={Logo} alt="logo" className="img-fluid" style={{ height: "50px" }} />
                                    <div className="logo-text-header"><span><b>D</b>aily</span><span><b>B</b>asket</span></div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-lg-6 d-flex gap-5 align-items-center justify-content-end">
                            <ul className="d-flex justify-content-end list-unstyled m-0">
                                <li>
                                    <Link to={checkCookie('dailyBasket') ? "" : "/login"} className="p-2 mx-1"
                                        id="pages" data-bs-toggle={checkCookie('dailyBasket') ? "dropdown" : ""} aria-expanded="false">
                                        {checkCookie('dailyBasket') ?
                                            <svg width="24" height="24">
                                                <use xlinkHref="#user"></use>
                                            </svg>
                                            : <img src={Login} height="24px" />}
                                    </Link>
                                    {checkCookie('dailyBasket') ?
                                        <ul className="logout-menu dropdown-menu border-0 p-3 rounded-0 shadow" aria-labelledby="pages">
                                            <li><Link to="/profile" class="dropdown-item">My Account</Link></li>
                                            <li onClick={signOut}><span className="dropdown-item">Sign Out</span></li>
                                        </ul> : null}
                                </li>
                                <li>
                                    {cartInfo?.items.length ?
                                        <Link to="" className="p-2 mx-1" data-bs-toggle="offcanvas"
                                            data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                                            <svg width="24" height="24">
                                                <use xlinkHref="#shopping-bag"></use>
                                            </svg>
                                        </Link>
                                        : <Link to="" className="p-2 mx-1" onClick={() => toast.success(`There are no items in your cart.`, { position: "top-right" })}>
                                            <svg width="24" height="24">
                                                <use xlinkHref="#shopping-bag"></use>
                                            </svg>
                                        </Link>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
