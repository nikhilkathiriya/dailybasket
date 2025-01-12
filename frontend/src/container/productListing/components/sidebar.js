import { Link } from "react-router-dom";
import { currencySymbol } from "../../../common/constant";

const Sidebar = () => {
    return <div className="sidebar">
        <div className="widget-product-categories">
            <h5 className="widget-title">Categories</h5>
            <ul className="product-categories sidebar-list list-unstyled">
                <li className="cat-item">
                    <Link to="">All</Link>
                </li>
                <li className="cat-item">
                    <Link to="" className="nav-link">Phones</Link>
                </li>
                <li className="cat-item">
                    <Link to="" className="nav-link">Accessories</Link>
                </li>
                <li className="cat-item">
                    <Link to="" className="nav-link">Tablets</Link>
                </li>
                <li className="cat-item">
                    <Link to="" className="nav-link">Watches</Link>
                </li>
            </ul>
        </div>
        <div className="widget-product-tags pt-3">
            <h5 className="widget-title">Tags</h5>
            <ul className="product-tags sidebar-list list-unstyled">
                <li className="tags-item">
                    <Link to="" className="nav-link">White</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">Cheap</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">Mobile</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">Modern</Link>
                </li>
            </ul>
        </div>
        <div className="widget-product-brands pt-3">
            <h5 className="widget-title">Brands</h5>
            <ul className="product-tags sidebar-list list-unstyled">
                <li className="tags-item">
                    <Link to="" className="nav-link">Apple</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">Samsung</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">Huwai</Link>
                </li>
            </ul>
        </div>
        <div className="widget-price-filter pt-3">
            <h5 className="widget-titlewidget-title">Filter By Price</h5>
            <ul className="product-tags sidebar-list list-unstyled">
                <li className="tags-item">
                    <Link to="" className="nav-link">Less than {currencySymbol}10</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">{currencySymbol}10- {currencySymbol}20</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">{currencySymbol}20- {currencySymbol}30</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">{currencySymbol}30- {currencySymbol}40</Link>
                </li>
                <li className="tags-item">
                    <Link to="" className="nav-link">{currencySymbol}40- {currencySymbol}50</Link>
                </li>
            </ul>
        </div>
    </div>
}

export default Sidebar;