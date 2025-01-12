import { useDispatch, useSelector } from "react-redux";
import ProductCard from '../../../common/productCard';
import { loginSuccess } from "../../../redux/slices/userSlice";
import { addProductToWishlist, getUserDetails } from "../../../redux/actions/profile";
import { toast } from "react-toastify";

const Wishlist = () => {
    const dispatch = useDispatch();
    const { _id, userInfo } = useSelector((state) => state.user);
    const { productList } = useSelector((state) => state.product);
    const element = document.getElementById("preloader");

    const userDetails = () => {
        getUserDetails({ user_id: _id }, (response) => {
            element.style.display = 'none'
            if (response.status === 200 || response.status === 201) {
                const { userDetails } = response.data
                dispatch(loginSuccess(userDetails))
            } else {
                toast.error(response.data.message, { position: "top-right" });
            }
        })
    }

    const onHandleWishlist = (pid) => {
        element.style.display = 'block';
        addProductToWishlist({ productId: pid, action: userInfo?.wishList?.includes(pid) ? false : true }, (res) => {
            if (res.status === 200 || res.status === 201) {
                toast.success(res.data.message, { position: "top-right" });
                userDetails();
            } else {
                element.style.display = 'none';
                toast.error(res.data.message, { position: "top-right" });
            }
        })
    }

    return <div className="col-md-8 col-lg-9 col-xl-10 col-xxl-10">
        <h5 className='p-3 border-dashed tab-description-heading'>Favorites List</h5>
        <div className='card border-0 shadow-sm p-3'>
            <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-4">
                {(userInfo.wishList.length ? productList.filter(_ => userInfo.wishList.includes(_.id)) : []).map((item) => <div key={item.name} className="wishlist-card col">
                    <button type="button" className="btn-close" onClick={() => onHandleWishlist(item.id)} ></button>
                    <ProductCard item={item} isWishlist={true} />
                </div>)}
                {(userInfo.wishList.length ? productList.filter(_ => userInfo.wishList.includes(_.id)) : []).length === 0 && "Favorites list not added"}
            </div>
        </div>
    </div>
}

export default Wishlist