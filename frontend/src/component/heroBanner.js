import { Link } from "react-router-dom";
import { heroBanner } from "../common/constant";

const HeroBanner = () => {
    return (<section style={{ backgroundImage: `url(${heroBanner.bannerImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="container-lg">
            <div className="row">
                <div className="col-xl-6 col-md-12 col-md-12 pt-5 mt-5">
                    <h2 className="display-1 ls-1" dangerouslySetInnerHTML={{ __html: heroBanner.title }}></h2>
                    <p className="fs-4">{heroBanner.subTitle}</p>
                    <div className="d-flex gap-3">
                        <Link to="/category" className="btn btn-primary text-uppercase fs-6 rounded-pill px-4 py-3 mt-3">Start Shopping</Link>
                        <Link to="/signup" className="btn btn-dark text-uppercase fs-6 rounded-pill px-4 py-3 mt-3">Join Now</Link>
                    </div>
                    <div className="row my-5">
                        {heroBanner.portfolioText.map((item) => {
                            return <div key={item.views} className="col">
                                <div className="row text-dark">
                                    <div className="col-auto"><p className="fs-1 fw-bold lh-sm mb-0">{item.views}</p></div>
                                    <div className="col"><p className="text-uppercase lh-sm mb-0">{item.text}</p></div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-3 g-0 justify-content-center">
                {heroBanner.advertisementTag.map((item) => {
                    return <div key={item.title} className="col">
                        <div className={`card border-0 ${item.class} rounded-0 p-4 text-light`}>
                            <div className="row"  style={{ alignItems: 'center' }}>
                                <div className="col-md-3 text-center">
                                    {item.svgImage}
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body p-0">
                                        <h5 className="text-light">{item.title}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </div>
    </section>);
};

export default HeroBanner;
