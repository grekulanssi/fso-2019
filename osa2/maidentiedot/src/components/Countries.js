import React from 'react'
import Country from './Country'

const Countries = ({ countries, handler }) => {
    console.log('countries:', countries)

    const rows = () =>
        countries.map(country =>
            <div key={country.name}>
                <span>{country.name}</span>
                <Button countryName={country.name} handler={handler} /><br />
            </div>
        )

    if (countries.length === 1) {
        return (
            <Country country={countries} />
        )
    } else if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else {
        return (
            <div>
                {rows()}
            </div>
        )
    }
}

const Button = ({ countryName, handler }) => {
    console.log("this button is for country: ", countryName)
    const handleButtonClick = () => {
        console.log("klikkasit: ", countryName)
        handler(countryName)
    }

    return (
        <button name={countryName} onClick={handleButtonClick}>show</button>
    )
}

export default Countries