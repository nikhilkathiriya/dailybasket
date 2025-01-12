import Breadcrumb from "../../component/breadcrumbs"

const AboutUs = () => {
    return <>
        <Breadcrumb title="About Us" isPath={false} />
        <section className="company-detail py-4">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">
                        <strong>Warm & Welcoming</strong> 
                        <p>At Daily Basket, we believe that a trip to the grocery store should be a delightful experience. We're more than just a place to buy food; we're your neighborhood market, committed to providing fresh, high-quality products and exceptional customer service. We strive to build strong relationships with our community, supporting local farmers and businesses whenever possible. Come experience the difference – we're always happy to see you!</p>
                    </div>
                    <div className="col-md-12">
                        <strong>Who are we?</strong> 
                        <p>Daily Basket is now the UK market leader in on-demand grocery delivery. We deliver 24/7 to most towns and cities across the UK. Harnessing the power of the local community, Daily Basket works with 50,000 independent, registered delivery drivers who are on hand to purchase and deliver your groceries straight to your door.</p>
                    </div>
                    <div className="col-md-12">
                        <strong>Focus on Quality & Selection</strong> 
                        <p>Daily Basket is your one-stop shop for all your grocery needs. We offer a wide selection of fresh produce, meat, dairy, and pantry staples, always sourced with quality in mind. We believe in supporting local farmers and businesses, and we're committed to bringing you the freshest and most delicious products available. Our knowledgeable staff is always on hand to assist you in finding exactly what you're looking for.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default AboutUs