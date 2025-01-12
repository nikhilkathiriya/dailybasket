const PaymentInfo = ({ state, onHandleChange, validator, updateDetails }) => {

    const years = Array.from(new Array(10), (val, index) => (index + 25));
    return <section>
        <h5 className='p-3 border-dashed tab-description-heading'>Payment Information</h5>
        <div className='card border-0 shadow-sm p-3 my-2'>
            <form id="form" className="form-group flex-wrap row">
                <div className="col-lg-4 pb-3">
                    <label>Card Holder Name</label>
                    <input type="text" name="cardHolder" className="form-control" value={state.paymentDetails.cardHolder} onChange={onHandleChange} />
                    <span className="error-message">{validator.current.message('Card Holder Name', state.paymentDetails.cardHolder, 'alpha_space')}</span>
                </div>
                <div className="col-lg-4 pb-3">
                    <label>Card Number</label>
                    <input type="text" name="cardNumber" className="form-control" value={state.paymentDetails.cardNumber} onChange={onHandleChange} />
                    <span className="error-message">{validator.current.message('Card Number', state.paymentDetails.cardNumber, 'card_num')}</span>
                </div>
                <div className="col-lg-4 pb-3 row">
                    <label>Expire Date</label>
                    <div className='d-flex gap-2'>
                        <select name='expireMM' className='form-select' value={state.expireDate.expireMM} onChange={onHandleChange}>
                            <option value=''>Month</option>
                            <option value='01'>January</option>
                            <option value='02'>February</option>
                            <option value='03'>March</option>
                            <option value='04'>April</option>
                            <option value='05'>May</option>
                            <option value='06'>June</option>
                            <option value='07'>July</option>
                            <option value='08'>August</option>
                            <option value='09'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                        </select>
                        <select name='expireYY' className='form-select' value={state.expireDate.expireYY} onChange={onHandleChange}>
                            <option value=''>Year</option>
                            {years.map((y) => {
                                return <option value={y}>20{y}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-lg-4 pb-3">
                    <label>CVV</label>
                    <input type="text" name="cvv" className="form-control" value={state.paymentDetails.cvv} onChange={onHandleChange} />
                    <span className="error-message">{validator.current.message('CVV', state.paymentDetails.cvv, 'min:3|max:4')}</span>
                </div>
            </form>
            <div className='text-center'>
                <button type='button' className="btn btn-primary text-uppercase" style={{ width: 'fit-content' }} onClick={updateDetails}>Update Info</button>
            </div>
        </div>
    </section>
}

export default PaymentInfo