import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import Breadcrumb from "./components/breadcrumbs";
import { ageVerificationText, category, checkValidStock, currencySymbol, getPriceCalculation } from "../../common/constant";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import QuentityStepper from "../../component/quentityStepper";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const { cartId, cartInfo } = useSelector((state) => state.cart);
    const { productList } = useSelector((state) => state.product);
    const location = useLocation();
    const { search } = location
    const prodID = new URLSearchParams(search).get("id")

    const productDetail = productList.find(_ => _.id === Number(prodID))
    const categoryDetail = category.find(_ => _.id === Number(productDetail.categoryId))
    const existInCart = cartInfo.items.find(_ => _.product_id === Number(prodID))
    const ageValidationCategory = categoryDetail.id === 2 || categoryDetail.id === 3;
    
    const [qty, setQty] = useState(1);

    const onHandleCart = () => {
        if (ageValidationCategory) {
            if (document.getElementById('age').checked === false) {
                alert('Age verification must be checked!');
                return false;
            }
        }
        toast.success(`Product has been added to cart.`, { position: "top-right" });
        dispatch(addToCart({
            uid: _id ? _id : "",
            cartID: cartId,
            items: { product_id: productDetail.id, qty, price: Number(getPriceCalculation(productDetail)) }
        }))
    }

    const ageVerifictionValidation = ageValidationCategory ? (
        <div className="form-check mt-3" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <input type="checkbox" className="form-check-input" id="age" style={{ border: '1px solid #787474', padding: '10px', cursor: 'pointer' }} />
            <div>
                <label className="form-check-label">
                    <h5> &nbsp;Age Verification<b style={{ color: 'red' }}>*</b></h5>
                </label><br />
                <label for="age" style={{ cursor: 'pointer' }}>{ageVerificationText}</label>
            </div>
        </div>
    ) : null;

    return <section id="selling-product" className="single-product mt-0 mt-md-5">
        <div className="container-lg">
            <Breadcrumb category={categoryDetail} product={productDetail} />
            <div className="row g-5">
                <div className="col-lg-6">
                    <div className="row flex-column-reverse flex-lg-row">
                        <div className="col-md-12 col-lg-12">
                            <div className="swiper product-large-slider">
                                <div className="swiper-wrapper">
                                    <div className="pdp-large-swiper-slide">
                                        <div className="image-zoom" data-scale="2.5" data-image="images/product-large-1.jpg"><img
                                            src={productDetail.image} alt="product-large" className="img-fluid" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="product-info">
                        <div className="element-header">
                            <h2 itemprop="name">{productDetail.name}</h2>
                        </div>
                        <div className="product-price pt-3 pb-3">
                            {productDetail.discount !== 0 && <span className="text-primary display-6 fw-bold"> {currencySymbol}{((productDetail.unitPrice * (1 - productDetail.discount / 100)).toFixed(2))}</span>}
                            {productDetail.discount ? <del className="ms-2">{currencySymbol}{productDetail.unitPrice}</del> : <span className="text-primary display-6 fw-bold">{currencySymbol}{productDetail.unitPrice}</span>}
                        </div>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{productDetail.info}</p>
                        <div className="meta-product py-2">
                            <div className="meta-item d-flex align-items-baseline">
                                <h6 className="item-title no-margin pe-2">Category:</h6>
                                <Link to={`/category?id=${categoryDetail.id}`}>{categoryDetail.name}</Link>
                            </div>
                        </div>
                        <div className="stock-label text-dark text-uppercase">{checkValidStock(productDetail.stock, existInCart?.qty, qty) ? "in stock" : "out of stock"}</div>
                        <div className="cart-wrap py-4">
                            <div className="product-quantity">
                                <div className="stock-button-wrap">
                                    <QuentityStepper qty={qty} setQty={setQty} productDetail={productDetail} />
                                    {ageVerifictionValidation}
                                    {checkValidStock(productDetail.stock, existInCart?.qty, qty) ? <div className="qty-button d-flex flex-wrap pt-3">
                                        <button type="button" onClick={onHandleCart} className="btn btn-dark py-3 px-4 text-uppercase mt-3">Add to cart</button>
                                    </div> : null}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default ProductDetail;