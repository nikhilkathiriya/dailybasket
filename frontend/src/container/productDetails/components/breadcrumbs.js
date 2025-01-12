import { Link } from "react-router-dom";

const Breadcrumb = ({ category, product }) => {
    return <nav className="breadcrumb">
        <Link className="breadcrumb-item" to={`/category?id=${category.id}`}>{category.name}</Link>
        <span className="breadcrumb-item active" aria-current="page">{product.name}</span>
    </nav>
}

export default Breadcrumb;