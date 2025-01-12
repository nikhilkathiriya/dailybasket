import { Link } from "react-router-dom";
import { Amex, Discovery, Logo, MasterCard, Visa } from "../../assets/images";

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="py-5">
                <div className="container-lg">
                    <div className="row">
                        <div className="footer-logo-container col-xl-3 col-lg-3 col-md-3">
                            <div className="footer-menu">
                                <Link to="/" className="logo d-flex align-items-center nav-link">
                                    <img src={Logo} height="70" alt="logo" />
                                    <div className="logo-text-footer"><span><b>D</b>aily</span><span><b>B</b>asket</span></div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title">Daily Basket</h5>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <Link to="/about-us" className="nav-link">About us</Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title">We Accept</h5>
                                <ul className="we-accept-footer list-unstyled">
                                    <li className="menu-item">
                                        <img src={Visa} />
                                    </li>
                                    <li className="menu-item">
                                        <img src={MasterCard} />
                                    </li>
                                    <li className="menu-item">
                                        <img src={Discovery} />
                                    </li>
                                    <li className="menu-item">
                                        <img src={Amex} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-4 col-md-4 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title">Contact Us</h5>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <a href="mailto:dailybasket247@gmail.com" className="nav-link">dailybasket247@gmail.com</a>
                                    </li>
                                    <li className="menu-item">
                                        <p className="nav-link">Address: 7 Langney Road, Eastbourne,BN21 3QA</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="footer-bottom">
                <div className="container-lg">
                    <div className="row">
                        <div className="copyright text-center">
                            <p>© 2025 Daily Basket. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
