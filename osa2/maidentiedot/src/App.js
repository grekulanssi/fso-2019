import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFiltertext, setNewFiltertext] = useState('')
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFiltertext.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFiltertextChange = (event) => {
    console.log('new filtertext is:', event.target.value)
    setNewFiltertext(event.target.value)
  }

  return (
    <div>
      <Form
        filtertext={newFiltertext}
        onChange={handleFiltertextChange}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
