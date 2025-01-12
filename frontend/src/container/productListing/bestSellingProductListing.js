import { useMemo } from "react"
import ProductCard from "../../common/productCard"
import Breadcrumb from "../../component/breadcrumbs"
import { useSelector } from "react-redux"

const BestSellingProductListing = () => {
    const { productList } = useSelector((state) => state.product);

    const renderProduct = useMemo(() => {
        return productList.filter(_ => _.isBestSelling).map((item) => {
            return <div key={item.name} className="col">
                <ProductCard item={item} />
            </div>
        })
    }, [])

    return <>
        <Breadcrumb title="Best Selling" isPath={true} />
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

export default BestSellingProductListing