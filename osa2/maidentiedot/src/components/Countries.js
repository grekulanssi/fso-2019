import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
    console.log('countries:', countries)

    const rows = () =>
        countries.map(country =>
            <div key={country.name}>
                <span>{country.name}</span><Button /><br />
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

const Button = () => {
    return (
    <button>show</button>
    )
}

export default Countries