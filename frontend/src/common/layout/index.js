import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
