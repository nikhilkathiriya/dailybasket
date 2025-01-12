import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { currencySymbol } from "../../../common/constant";
import { checkCookie } from "../../../common/cookie";

const CartSummary = () => {
    const navigate = useNavigate();
    const { cartInfo } = useSelector((state) => state.cart);
    const finalTotal = cartInfo.items.reduce((sum, row) => sum + Number(row.price * row.qty), 0)

    const onHandleCheckout = () => {
        if (!checkCookie('dailyBasket')) {
            toast.success('Please sign in to your Account to process checkout.', { position: "top-right" })
        } else {
            navigate('/checkout')
        }
    }

    return <div className="cart-totals bg-grey">
        <h4 className="text-dark pb-4">Cart Total</h4>
        <div className="total-price pb-5">
            <table cellspacing="0" className="table text-uppercase">
                <tbody>
                    <tr className="order-total pt-2 pb-2 border-bottom">
                        <th>Total</th>
                        <td data-title="Total" style={{ textAlign: 'end' }}>
                            <span className="price-amount amount text-dark ps-5">
                                <bdi>
                                    <span className="price-currency-symbol">{currencySymbol}</span>{finalTotal.toFixed(2)}
                                </bdi>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="button-wrap row g-2">
            <div className="col-md-6">
                <Link to="/category" className="btn btn-dark py-3 px-3 text-uppercase btn-rounded-none w-100">Continue Shopping</Link>
            </div>
            <div className="col-md-6">
                <button type="button" onClick={onHandleCheckout} className="btn btn-dark py-3 px-3 text-uppercase btn-rounded-none w-100" disabled={!cartInfo.items.length}>Process to Checkout</button>
            </div>
        </div>
    </div>
}

export default CartSummary;