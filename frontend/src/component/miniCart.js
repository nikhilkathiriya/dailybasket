import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { currencySymbol } from "../common/constant";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { createOrder } from "../redux/actions/profile";
import { afterOrderCartRemove, setOrderDetails } from "../redux/slices/cartSlice";

const initialOptions = {
    "client-id": "AaiOGvq7mdQLuA5Ymn_d2T87EdD64rhf4MTtENTFdSMp2tVvTnCwmXPtTT0zHdGiScv7HRBnXNt2_9-t",
    currency: "GBP",
};

const MiniCart = ({ isTotal = false, scheduleDelivery, phoneNumber, address }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartInfo } = useSelector((state) => state.cart);
    const { productList } = useSelector((state) => state.product);
    const element = document.getElementById("preloader");
    const [updatedCart, setUpdatedCart] = useState([]);

    useEffect(() => {
        let newCart = [];
        if (cartInfo.items.length) {
            cartInfo.items.map((item) => {
                const { product_id, qty, price } = item;
                newCart.push({ product_id, quantity: qty, price })
            })
            setUpdatedCart(newCart)
        }
    }, [cartInfo.items])

    const getProductDetails = (pid) => {
        return productList.find((_) => _.id === Number(pid))
    }

    const getPriceCalculation = (item) => {
        const { unitPrice, discount } = getProductDetails(item.product_id);
        if (discount !== 0) {
            return (Number(unitPrice) * (1 - discount / 100)).toFixed(2)
        } else if (discount) {
            return Number(unitPrice).toFixed(2)
        } else {
            return Number(unitPrice).toFixed(2)
        }
    }

    const finalTotal = cartInfo.items.reduce((sum, row) => sum + Number(getPriceCalculation(row) * row.qty), 0)

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: finalTotal.toFixed(2),
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        element.style.display = 'block';
        console.log("data:-", data, actions);
        actions.order.capture().then((details) => {
            console.log("details:-", details);
            let scheduleData = scheduleDelivery.deliver ? scheduleDelivery : { deliver: scheduleDelivery.deliver }
            console.log("updatedCart:--", updatedCart, scheduleData);
            createOrder({
                products: updatedCart,
                shippingCharge: 0,
                total_amount: finalTotal.toFixed(2),
                deliveryDate: new Date(),
                scheduleDelivery: scheduleData,
                paymentStatus: "paid"
            }, async (res) => {
                element.style.display = 'none'
                if (res.status === 200 || res.status === 201) {
                    toast.success(res.data.message, { position: "top-right" });
                    await dispatch(setOrderDetails(res.data.order));
                    await dispatch(afterOrderCartRemove());
                    await navigate(`/order-detail?id=${res.data.order._id}`);
                } else {
                    toast.error(res.data.message, { position: "top-right" });
                }
            })
        });
    }

    const onCancelOrder = (data) => {
        toast.success(`Your order is cancel`, { position: "top-right" })
        element.style.display = 'none'
    }

    const onErrorOrder = (data) => {
        toast.error('Sorry, your Order is not placed. Please try after some time!', { position: "top-right" })
        element.style.display = 'none'
    }

    return <>
        <h4 className="d-flex justify-content-between align-items-center" style={{ padding: "0px 15px" }}>
            <span className="text-secondery">{isTotal ? "Order Summary" : "Your Cart"}</span>
            {!isTotal && <span className="badge bg-primary rounded-pill">{cartInfo.items.length}</span>}
        </h4>
        <ul className="list-group mb-3">
            {cartInfo.items.map((item) => {
                return <>
                    <li className="list-group-item d-flex justify-content-between lh-sm" >
                        <div>
                            <p className="my-0" onClick={() => navigate(`/product?id=${item.product_id}`)} style={{ cursor: "pointer" }}>{getProductDetails(item.product_id).name}</p>
                            {/*<small className="text-body-secondary">{getProductDetails(item.product_id).info}</small>*/}
                        </div>
                        <div className="d-flex gap-3">
                            <span>{item.qty}</span>
                            <span className="text-body-secondary">{currencySymbol}{item.price}</span>
                        </div>
                    </li>
                    {isTotal &&
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <span className="text-dark">Item Total</span>
                            <span className="text-dark">{currencySymbol}{(getPriceCalculation(item) * item.qty).toFixed(2)}</span>
                        </li>
                    }
                </>
            })}
            {isTotal && <>
                <li className="list-group-item lh-sm" style={{ borderTopColor: "#ececec", borderTopWidth: "2px", cursor: 'pointer', textAlign: 'center' }}>
                    <Link to='/cart' className="text-dark">EDIT BAG</Link>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm" style={{ borderTopColor: "#ececec", borderTopWidth: "2px" }}>
                    <strong className="text-dark">Total</strong>
                    <strong className="text-dark">{currencySymbol}{finalTotal.toFixed(2)}</strong>
                </li>
            </>}
        </ul>
        {isTotal && phoneNumber?.length >= 10 && address && <div>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                    onCancel={(data, actions) => onCancelOrder(data, actions)}
                    onError={(data, actions) => onErrorOrder(data, actions)}
                />
            </PayPalScriptProvider>
        </div>}
    </>
}

export default MiniCart