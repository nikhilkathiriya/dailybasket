import Breadcrumb from "../../component/breadcrumbs";
import CartItems from "./components/cartItems";
import CartSummary from "./components/cartSummary";

const Cart = () => {
    return <>
        <Breadcrumb title="Cart"/>
        <section className="py-5">
            <div className="container-lg">
                <div className="row g-5">
                    <div className="col-md-8">
                        <CartItems />
                    </div>
                    <div className="col-md-4">
                        <CartSummary />
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Cart;