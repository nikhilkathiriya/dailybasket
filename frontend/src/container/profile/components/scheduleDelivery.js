import { toast } from "react-toastify"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { cancelScheduledOrders, getOrders } from "../../../redux/actions/profile"
import { setUserOrderDetails } from "../../../redux/slices/userSlice"
import { useMemo } from "react";
import { category, currencySymbol, formatDate, getProductDetail } from "../../../common/constant";

const ScheduleDeliveryList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userOrderDetails } = useSelector((state) => state.user);
    const element = document.getElementById("preloader");

    const getUpdatedOrders = () => {
        getOrders('', (res) => {
            element.style.display = 'none'
            if (res.status === 200 || res.status === 201) {
                dispatch(setUserOrderDetails(res.data.orders))
            } else {
                toast.error(res?.response?.data?.message, { position: "top-right" });
            }
        })
    }

    useMemo(() => {
        element.style.display = 'block'
        getUpdatedOrders()
    }, [])

    const onHandleCancel = (item) => {
        element.style.display = 'block'
        cancelScheduledOrders({ order_id: item._id }, (res) => {
            if (res.status === 200 || res.status === 201) {
                toast.success(res.data.message, { position: "top-right" });
                getUpdatedOrders()
            } else {
                element.style.display = 'none'
                toast.error(res.data.message, { position: "top-right" });
            }
        })
    }

    const renderOrderList = useMemo(() => {
        return userOrderDetails?.length ? (userOrderDetails.filter(_ => _.status !== "cancelled")).map((item) => {
            const { _id, products, updatedAt, deliveryDate, total_amount } = item
            const { id, image, name, info, categoryId } = getProductDetail(products[0]);
            const categoryDetail = category.find(_ => _.id === Number(categoryId))

            return <li className="col-xl-6 col-12 list-group-item lg-d-flex justify-content-between lh-sm">
                <div className='orders-product-info d-flex w-100 gap-3'>
                    <div style={{ width: '100px', textAlign: 'center' }}>
                        <img src={image} alt="product name" className="img-fluid" style={{ height: "70px" }} />
                    </div>
                    <div className='w-100'>
                        <div className='d-grid mb-2' style={{ lineHeight: '1.5' }}>
                            <b className="text-body-secondary mb-0">Order# {_id}</b>
                            <small className="text-body-secondary">Ordered on {formatDate(updatedAt)}</small>
                            <small className="text-body-secondary">Expected Delivery Date {formatDate(deliveryDate)}</small>
                            <small className="text-body-secondary">Order Total {currencySymbol}{total_amount}</small>
                        </div>
                        <div className="product-info">
                            <h6 className="pb-1" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product?id=${id}`)}>{name}</h6>
                            <p className="m-0 pb-1" style={{ wordBreak: "break-word" }}>{info}</p>
                            <div className="meta-product pt-2">
                                <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div className="meta-item d-flex align-items-baseline">
                                        <h6 className="item-title no-margin pe-2">Category:</h6>
                                        <span>{categoryDetail.name}</span>
                                    </div>
                                    {new Date(deliveryDate) > new Date() && <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => onHandleCancel(item)}>Cancel</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        }) : null
    }, [userOrderDetails])

    return <div className="col-md-8 col-lg-9 col-xl-10 col-xxl-10">
        <h5 className='p-3 border-dashed tab-description-heading'>Delivery Information</h5>
        <div className='card border-0 shadow-sm p-3 gap-2'>
            <section className='col order-product-list'>
                <ul className="list-group mb-3 d-flex" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {renderOrderList}
                </ul>
            </section>
        </div>
    </div>
}

export default ScheduleDeliveryList