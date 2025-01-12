const Filter = () => {
    return <div className="filter-shop d-flex justify-content-between">
        <div className="showing-product">
            <p>Showing 1–10 of 25 results</p>
        </div>
        <div className="sort-by">
            <select id="input-sort" className="form-control" data-filter-sort="" data-filter-order="">
                <option value="">Default sorting</option>
                <option value="">Name (A - Z)</option>
                <option value="">Name (Z - A)</option>
                <option value="">Price (Low-High)</option>
                <option value="">Price (High-Low)</option>
                <option value="">Rating (Highest)</option>
                <option value="">Rating (Lowest)</option>
                <option value="">Model (A - Z)</option>
                <option value="">Model (Z - A)</option>
            </select>
        </div>
    </div>
}

export default Filter;