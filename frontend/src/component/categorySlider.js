import { Link } from "react-router-dom";
import { category } from "../common/constant";
import Slider from "react-slick";

const CategorySlider = () => {
    const categoryConfig = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (<section className="py-5 overflow-hidden">
        <div className="container-lg">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-header d-flex flex-wrap justify-content-between mb-5">
                        <h2 className="section-title">Category</h2>
                        <div className="d-flex align-items-center">
                            <Link to="/category" className="btn btn-primary me-2">View All</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Slider {...categoryConfig}>
                        {category.map((item) => {
                            return <div key={item.name} className="nav-link text-center category-slider">
                                <Link to={`/category?id=${item.id}`}><img src={item.image} className="rounded-circle" alt="Category Thumbnail" style={{ display: 'unset', width: '160px', height: '160px', objectFit: 'cover', objectPosition: 'center' }} /></Link>
                                <h4 className="fs-6 mt-3 fw-normal category-title">{item.name}</h4>
                            </div>
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    </section>)
}

export default CategorySlider;