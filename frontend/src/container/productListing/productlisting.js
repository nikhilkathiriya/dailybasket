import { useMemo } from "react"
import { useLocation } from "react-router"
import { category } from "../../common/constant"
import ProductCard from "../../common/productCard"
import Breadcrumb from "../../component/breadcrumbs"
import { useSelector } from "react-redux"

const ProductListing = () => {
    const location = useLocation();
    const { productList } = useSelector((state) => state.product);
    const { search } = location
    const catID = new URLSearchParams(search).get("id")
    const prodDiscount = new URLSearchParams(search).get("discount")

    const categoryDetail = category.find(_ => _.id === Number(catID))

    const renderProduct = useMemo(() => {
        const conditionalList = Number(catID) ? productList.filter(_ => _.categoryId === Number(catID)) : Number(prodDiscount) ? productList.filter(_ => _.discount === Number(prodDiscount)) : productList;
        return conditionalList.map((item) => {
            return <div key={item.name} className="col">
                <ProductCard item={item} />
            </div>
        })
    }, [catID])

    return <>
        <Breadcrumb title={categoryDetail ? categoryDetail.name : "Category"} isPath={true} />
        <div className="py-4">
            <div className="container-lg">
                <div className="row g-5">
                    <main className="col-md-12">
                        <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
                            {renderProduct}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </>
}

export default ProductListing