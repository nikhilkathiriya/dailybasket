import { Link } from "react-router-dom";
import { promotionalBanner } from "../common/constant";
import ProductCard from "../common/productCard";
import CategorySlider from "../component/categorySlider";
import HeroBanner from "../component/heroBanner";
import ProductSlider from "../component/productSlider";
import { useSelector } from "react-redux";

const LandingPage = () => {
    const { productList } = useSelector((state) => state.product);
    
    return <>
        <HeroBanner />
        <CategorySlider />
        {/* -------------- Best Selling Item Section --------------------- */}
        <section className="pb-5">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap justify-content-between my-4">
                            <h2 className="section-title">Best selling products</h2>
                            <div className="d-flex align-items-center">
                                <Link to="/best-selling" className="btn btn-primary rounded-1">View All</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div
                            className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
                            {productList.map((item, i) =>
                                item.isBestSelling && i <= 5 &&
                                <div key={item.name} className="col">
                                    <ProductCard item={item} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* -------------- Promotional banner --------------------- */}
        <section className="py-3">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">
                        <div className="banner-blocks">
                            {promotionalBanner.map((item) => {
                                return <div key={item.title} className={item.class}
                                    style={{ background: `url(${item.image}) no-repeat`, backgroundSize: 'cover' }}>
                                    <div className="banner-content p-5">
                                        <div className="content-wrapper text-light">
                                            <h3 className="banner-title text-light">{item.title}</h3>
                                            <p>{item.discount}</p>
                                            <Link to={item.link} className="btn-link text-white">Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <ProductSlider title={'Favourite'} data={productList} />


        <section className="py-5">
            <div className="container-lg">
                <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-4">
                    <div className="col">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32">
                                    <use xlinkHref="#package"></use>
                                </svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>Free delivery</h5>
                                <p className="card-text">Order online and get your groceries delivered right to your doorstep.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32">
                                    <use xlinkHref="#secure"></use>
                                </svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>100% secure payment</h5>
                                <p className="card-text">Enjoy a safe and secure shopping experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32">
                                    <use xlinkHref="#quality"></use>
                                </svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>Quality guarantee</h5>
                                <p className="card-text">Experience the difference: Quality guaranteed on all products.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32">
                                    <use xlinkHref="#savings"></use>
                                </svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>Guaranteed savings</h5>
                                <p className="card-text">Find incredible deals and guaranteed savings on all your grocery needs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default LandingPage;