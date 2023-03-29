const Persons = ({ personsToShow, deletePerson }) => {
    return (
        <ul>
            {personsToShow.map(person =>
                <Person
                    key={person.name}
                    person={person}
                    delPerson={() => deletePerson(person.id)} />)}
        </ul>
    )
}

const Person = ({ person, delPerson }) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={delPerson}>
                delete
            </button>
        </li>
    )
}

export default Persons