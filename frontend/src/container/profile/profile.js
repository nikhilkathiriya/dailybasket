import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../component/breadcrumbs';
import { Orders, ScheduleDelivery } from '../../assets/images';
import { checkCookie } from '../../common/cookie';
import { useNavigate } from 'react-router';
import MyProfile from './components/myProfile';
import ScheduleDeliveryList from './components/scheduleDelivery';
import Wishlist from './components/wishlist';
import MyOrders from './components/orders';

const Profile = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(1);

    useEffect(() => {
        if (!checkCookie('dailyBasket')) navigate('/')
    }, [])

    return (<>
        <Breadcrumb title="Account Information" isPath={false} />
        <section className="pb-5">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-4 col-lg-3 col-xl-2 col-xxl-2">
                        <ul className="account navbar-nav justify-content-end menu-list list-unstyled d-flex mb-0">
                            <li className={`nav-item border-dashed ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
                                <div className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <use xlinkHref="#user" xlink></use>
                                    </svg>
                                    <span>My Profile</span>
                                </div>
                            </li>
                            <li className={`nav-item border-dashed ${tab === 2 ? 'active' : ''}`} onClick={() => setTab(2)}>
                                <div className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                                    <img src={ScheduleDelivery} height="24px" />
                                    <span>Schedule Delivery </span>
                                </div>
                            </li>
                            <li className={`nav-item border-dashed ${tab === 3 ? 'active' : ''}`} onClick={() => setTab(3)}>
                                <div className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <use xlinkHref="#wishlist" xlink></use>
                                    </svg>
                                    <span>Wishlist</span>
                                </div>
                            </li>
                            <li className={`nav-item border-dashed ${tab === 4 ? 'active' : ''}`} onClick={() => setTab(4)}>
                                <div className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                                    <img src={Orders} height="24px" />
                                    <span>Orders</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {tab === 1 && <MyProfile />}
                    {tab === 2 && <ScheduleDeliveryList />}
                    {tab === 3 && <Wishlist />}
                    {tab === 4 && <MyOrders />}
                </div>
            </div>
        </section>
    </>
    );
};

export default Profile;
