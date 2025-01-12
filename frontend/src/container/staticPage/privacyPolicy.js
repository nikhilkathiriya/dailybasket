import Breadcrumb from "../../component/breadcrumbs"

const PrivacyPolicy = () => {
    return <>
        <Breadcrumb title="Privacy Policy" isPath={false} />
        <section className="company-detail py-4">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">
                        <strong>About Daily Basket and this Statement</strong>
                        <p>This Privacy Notice aims to give you information on how We Deliver Local Limited, trading as Daily Basket (referred to as “Daily Basket”, "we", "us" or "our") collects and processes personal data. We do this through your use of the Daily Basket website and/or mobile app.</p>
                        <p>We are the controller for all personal data collected when you engage with us via our website, mobile application or directly with us. We take this responsibility very seriously and take appropriate measures and precautions to protect your personal data. Our services are not intended for children and we do not knowingly collect data relating to children.</p>
                        <p>This Privacy Statement should be read in conjunction with any other information we provide when you provide your data and when we contact you.</p>
                    </div>
                    <div className="col-md-12">
                        <strong>The data we collect about you</strong>
                        <p>Personal data means any information about an individual from which that person can be identified, or is identifiable. We may collect, store use and transfer different kinds of personal data, which we have broadly grouped together as follows:</p>
                        <ul>
                            <li>Identity data - includes first name, last name, username, marital status, title, date of birth and gender.</li>
                            <li>Contact data - includes billing address, delivery address, email address and telephone numbers.</li>
                            <li>Financial data - includes bank account and payment card details.</li>
                            <li>Transaction data - includes details about payments to and from you and other details of services you have purchased from us.</li>
                            <li>Technical data - includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                            <li>Profile data - includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
                            <li>Usage data - includes information about how you use our website, products and services.</li>
                            <li>Marketing and communications data - includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default PrivacyPolicy