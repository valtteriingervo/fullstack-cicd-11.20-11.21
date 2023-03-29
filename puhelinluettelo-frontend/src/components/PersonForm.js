const PersonForm = (props) => {

    const addNewName = props.addNewName
    const newName = props.newName
    const handleNameChange = props.handleNameChange
    const newNumber = props.newNumber
    const handleNumberChange = props.handleNumberChange

    return (
        <form onSubmit={addNewName}>
            <div>
                name:
                <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number:
                <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm