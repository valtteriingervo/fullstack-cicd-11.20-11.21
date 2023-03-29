import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personService from './services/PersonsService'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)
  const [statusIsError, setStatusErrorOrNot] = useState(true)
  /* 
  ** Note that we assume that each person in the phonebook has
  ** first name and a surname separated by a space, so the initial filter
  ** term '' is valid.
  */
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewName = (event) => {
    // Prevent site from reloading in any case
    event.preventDefault()

    // Check whether the name arleady is in the phonebook
    const nameAlreadyInList = persons.find(
      person => person.name === newName)

    if (nameAlreadyInList) {
      const existingPerson = personFinderByName(newName)
      const existingNameMsg
        = `${existingPerson} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(existingNameMsg)) {

        const existingPersonObj =
          persons.find(person => person.name === newName)

        personService
          .changePersonNumber(existingPersonObj, newNumber)
          .then(responseData => {
            console.log(responseData, 'responseData')
            return 'time to refresh'
          })
          .then((result) => {
            console.log(result)
            refreshPersons()
            displayStatusMessage(`Number of ${newName} changed to ${newNumber}`)
          })
          .catch((error) => {
            console.log(error)
            displayStatusMessage(`Information of ${newName} has already been removed from server`, true)
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          displayStatusMessage(`Added ${returnedPerson.name}`)
        })
    }
  }

  // Use default parameter for isError, assume it's a good operation
  const displayStatusMessage = (message, isError = false) => {
    // Display message
    setStatusErrorOrNot(isError)
    setStatusMessage(message)
    // Hide message after X seconds
    setTimeout(() => {
      setStatusMessage(null)
    }, 4000)
  }

  const refreshPersons = () => {
    personService
      .getAll()
      .then(updatedPersons => {
        setPersons(updatedPersons)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterTermChange = (event) => {
    setFilterTerm(event.target.value)
  }

  const personFinder = id => {
    return persons.find(person => person.id === id).name
  }

  const personFinderByName = name => {
    return persons.find(person => person.name === name).name
  }

  const deletePerson = (id) => {
    console.log(id, 'id')
    const delPersonName = personFinder(id)
    const confirmMsg = `Delete ${delPersonName} ?`

    if (!window.confirm(confirmMsg)) {
      console.log('The user decided to cancel the deletion')
    }
    else {
      personService
        .delPerson(id)
        .then(responseCode => {
          console.log(`deleted person ${delPersonName} with status code ${responseCode}`)
          return 'time to refresh'
        })
        .then((result) => {
          console.log(result)
          refreshPersons()
          displayStatusMessage(`Deleted ${delPersonName}`)
        })
    }
  }

  const personsToShow = persons.filter(person => {
    const pNameLower = person.name.toLowerCase()
    const fTermLower = filterTerm.toLowerCase()
    return pNameLower.includes(fTermLower)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} isError={statusIsError} />

      <Filter
        filterTerm={filterTerm}
        handleFilterTermChange={handleFilterTermChange}
      />

      <h3>add a new</h3>

      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />

    </div>
  )

}

export default App