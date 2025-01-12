
const QuentityStepper = ({ qty, setQty, productDetail }) => {

    const onHandlePlus = () => {
        setQty(Number(qty) + 1)
    }

    const onQtyChange = (e) => {
        setQty(Number(e.target.value) <= 0 ? 1 : Number(e.target.value) > Number(productDetail.stock) ? Number(productDetail.stock) : Number(e.target.value))
    }

    const onHandleMinus = () => {
        setQty(Number(qty) > 1 ? Number(qty) - 1 : 1)
    }


    return <div className="input-group product-qty" style={{ maxWidth: '150px' }}>
        <span className="input-group-btn">
            <button type="button" onClick={onHandleMinus} className="quantity-left-minus btn btn-light btn-number">
                <svg width="16" height="16">
                    <use xlinkHref="#minus"></use>
                </svg>
            </button>
        </span>
        <input type="text" name="quantity" className="form-control input-number text-center"
            value={qty} min="1" max="100" onChange={onQtyChange} />
        <span className="input-group-btn">
            <button type="button" onClick={onHandlePlus} className="quantity-right-plus btn btn-light btn-number">
                <svg width="16" height="16">
                    <use xlinkHref="#plus"></use>
                </svg>
            </button>
        </span>
    </div>
}

export default QuentityStepper