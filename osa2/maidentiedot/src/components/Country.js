import React from 'react'

const Country = ({ country }) => {

    console.log('country:', country)
    const single = () =>
        country.map(country =>
            <div key={country.name}>
                <h2>{country.name}</h2>
                <span>capital: {country.capital}</span><br />
                <span>population: {country.population}</span>
                <h3>languages</h3>
                <ul>
                    {country.languages.map(lang => (
                        <li key={lang.name}>{lang.name}</li>
                    ))}
                </ul>
                <span><img src={country.flag} alt={'flag of ' + country.name} className='flag' /></span>
            </div>
        )

    return (
        <div>
            {single()}
        </div>
    )
}

export default Country