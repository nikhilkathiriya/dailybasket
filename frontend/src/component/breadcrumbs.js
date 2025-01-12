import { Link } from "react-router-dom";
import { Banner1 } from "../assets/images";

const Breadcrumb = ({ title, isPath }) => {
    return <section className="jarallax py-5">
        <img src={Banner1} alt="" className="jarallax-img" />
        <div className="hero-content py-0 py-md-5">
            <div className="container-lg d-flex flex-column d-md-block align-items-center">
                {isPath ? <nav className="breadcrumb">
                    <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                    <span className="breadcrumb-item active" aria-current="page">{title}</span>
                </nav> : null}
                <h1>{title}</h1>
            </div>
        </div>
    </section>
}

export default Breadcrumb;