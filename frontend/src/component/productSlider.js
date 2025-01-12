import ProductCard from "../common/productCard";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProductSlider = ({ title, data }) => {
    const { userInfo } = useSelector((state) => state.user);
    const [wishList, setWishList] = useState([]);

    useEffect(()=> {
        setWishList(data.filter(item => userInfo?.wishList?.includes(item.id)))
    },[userInfo?.wishList])

    const productConfig = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
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

    return (<section key={title} id="featured-products" className="products-carousel">
        <div className="container-lg overflow-hidden py-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-header d-flex flex-wrap justify-content-between my-4">
                        <h2 className="section-title">{title}</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="product-grid row">
                        <Slider {...productConfig}>
                            {wishList.map((item) =>
                                <div key={item.id} className="col"><ProductCard item={item} style={{ width: 'auto', marginRight: '30px', flexShrink: 0 }} /></div>
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default ProductSlider;