import PostcodeLookupComponent from "../../../component/postcodeLookup"

const BillingAddress = ({ state, onHandleChange, validator, setAddress, updateDetails }) => {
    return <section>
        <h5 className='p-3 border-dashed tab-description-heading'>Personal Information</h5>
        <div className='card border-0 shadow-sm p-3 my-2'>
            <form id="form" className="form-group flex-wrap row">
                <div className="col-lg-4 pb-3">
                    <label>First Name</label>
                    <input type="text" name="firstName" className="form-control" value={state.firstName} onChange={onHandleChange} />
                </div>
                <div className="col-lg-4 pb-3">
                    <label>Last Name</label>
                    <input type="text" name="lastName" className="form-control" value={state.lastName} onChange={onHandleChange} />
                </div>
                <div className="col-lg-4 pb-3">
                    <label>Email Address</label>
                    <input type="email" name="email" className="form-control" value={state.email} readOnly />
                </div>
                <div className="col-lg-4 pb-3">
                    <label>Phone Number&nbsp;<b style={{ color: 'red' }}>*</b></label>
                    <input type="text" name="phone" className="form-control" value={state.phone} onChange={onHandleChange} />
                    <span className="error-message">{validator.current.message('Phone Number', state.phone, 'required|phone')}</span>
                </div>
            </form>
        </div>
        <h5 className='p-3 border-dashed tab-description-heading'>Billing Information</h5>
        <div className='card border-0 shadow-sm p-3 my-2'>
            <form id="form" className="form-group flex-wrap row">
                <div className="col-lg-4 pb-3 find-address-section">
                    <label>Find My Address&nbsp;<b style={{ color: 'red' }}>*</b></label>
                    <PostcodeLookupComponent onAddressSelected={(address) => setAddress(address)} />
                </div>
                <div className="col-lg-4 pb-3">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" value={state.address} readOnly />
                </div>
                <div className="col-lg-4 pb-3">
                    <label>Postcode</label>
                    <input id="postcode" type="text" name="postcode" className="form-control" value={state.postcode} readOnly />
                </div>
                <div className="col-lg-12 pb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="switch">
                        <input type="checkbox" name="deliver" value={state.scheduleDelivery.deliver} checked={state.scheduleDelivery.deliver} onChange={onHandleChange} />
                        <span className="slider"></span>
                    </label>
                    <label>Schedule Delivery</label>
                </div>
                {state.scheduleDelivery.deliver && <>
                    <div className="col-lg-5 pb-3">
                        <label>How many times you need this order?</label>
                        <input type="text" name="often" className="form-control" value={state.scheduleDelivery.often} onChange={onHandleChange} />
                    </div>
                    <div className="col-lg-7 pb-3">
                        <label>How many days of interval do you prepared between delivery?</label>
                        <input type="text" name="interval" className="form-control" value={state.scheduleDelivery.interval} onChange={onHandleChange} />
                    </div>
                </>}
            </form>
            <div className='text-center'>
                <button type='button' className="btn btn-primary text-uppercase" style={{ width: 'fit-content' }} onClick={updateDetails}>
                    {state.phone?.length >= 10 && state.address ? "Update Info" : "Submit"}
                </button>
            </div>
        </div>
    </section>
}

export default BillingAddress