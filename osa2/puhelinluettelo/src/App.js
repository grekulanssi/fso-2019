import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltertext, setNewFiltertext] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')
  
  const rows = () =>
    persons.filter(person => person.name.toLowerCase().includes(newFiltertext.toLowerCase())).map(person =>
      <li key={person.name}>{person.name} {person.number}</li>
    )

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(e => e.name === personObject.name)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    /*Filter is also wiped to let the user certainly see the name she just added*/
    setNewFiltertext('')
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

      <Persons rows={rows()}/>

    </div>
  )
}

export default App