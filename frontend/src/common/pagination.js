import { Link } from "react-router-dom";

const Pagination = () => {
    return <nav className="text-center py-4" aria-label="Page navigation">
        <ul className="pagination d-flex justify-content-center">
            <li className="page-item disabled">
                <Link className="page-link bg-none border-0" to="" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </Link>
            </li>
            <li className="page-item active" aria-current="page"><Link className="page-link border-0" href="">1</Link></li>
            <li className="page-item"><Link className="page-link border-0" href="">2</Link></li>
            <li className="page-item"><Link className="page-link border-0" href="">3</Link></li>
            <li className="page-item">
                <Link className="page-link border-0" to="" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </Link>
            </li>
        </ul>
    </nav>
}

export default Pagination;