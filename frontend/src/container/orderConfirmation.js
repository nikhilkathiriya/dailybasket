import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumb from "../component/breadcrumbs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { formatDate } from "../common/constant";

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { search } = location
    const orderID = new URLSearchParams(search).get("id")
    const { orderDetails } = useSelector((state) => state.cart);

    useEffect(() => {
        if (orderID) {
            navigate('/order-detail');
            window.location.reload(true)
        }
    }, [orderID])
    console.log("orderDetails:0-", orderDetails);
    
    return <>
        <Breadcrumb title="Thank you" isPath={false} />
        <section className="my-3">
            <div className="container-lg">
                <div className="row" style={{ background: '#8080800d', border: '1px solid #efefef', borderRadius: "10px", textAlign: 'center' }}>
                    <div className="col-md-12 py-5">
                        <div className="text-black">
                            <svg className="order-id-tag bi flex-shrink-0 me-3 text-uppercase" width="1.75em" height="1.75em"><use xlinkHref="#check"></use></svg>
                            YOUR ORDER NUMBER IS {orderDetails._id}
                        </div>

                        <p className="mb-0 mt-3">The estimated delivery date is {formatDate(new Date())} - {formatDate(orderDetails.deliveryDate)}</p>
                        <p>We'll send you an email with all the details</p>
                        <Link to="/category" className="btn btn-outline-primary">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default OrderConfirmation;