const Filter = ({ filterTerm, handleFilterTermChange }) => {
    return (
        <div>
            filter shown with
            <input
                value={filterTerm}
                onChange={handleFilterTermChange}
            />
        </div>
    )
}

export default Filter