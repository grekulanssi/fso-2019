import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltertext, setNewFiltertext] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    phonebookService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const rows = () =>
    persons.filter(person => person.name.toLowerCase().includes(newFiltertext.toLowerCase())).map(person =>
      <li key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person)}>remove</button></li>
    )

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(e => e.name === personObject.name)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        var personToBeReplaced = persons.find(p => p.name === personObject.name)
        phonebookService
          .replace(personObject, personToBeReplaced.id)
          .then(returnedPerson => {
            console.log('returnedperson is ', returnedPerson)
            console.log('person to be replaced is ', personToBeReplaced)
            setPersons(persons.map(p => p.name !== returnedPerson.name ? p : returnedPerson))
            setNotificationMessage(
              `Changed number of ${returnedPerson.name} successfully`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setErrorMessage(
              `Information of '${personToBeReplaced.name}' was already deleted from server, please try again`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.name !== personToBeReplaced.name))
          })
      }
    }
    else {
      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
    /*Filter is also wiped to let the user certainly see the name she just added*/
    setNewFiltertext('')
  }

  const removePerson = (person) => {
    console.log('remove button clicked', person)

    if (window.confirm('Are you sure you want to remove ' + person.name + ' from phonebook?')) {
      phonebookService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotificationMessage(
            `${person.name} removed successfully.`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage(
            `Information of '${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== person.name))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFiltertextChange = (event) => {
    console.log(event.target.value)
    setNewFiltertext(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />

      <Filter
        filtertext={newFiltertext}
        onChange={handleFiltertextChange}
      />

      <h3>add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        valueNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons rows={rows()} />

    </div>
  )
}

export default App