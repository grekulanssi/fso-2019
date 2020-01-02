import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {

    const [weather, setWeather] = useState([])

    useEffect(() => {
        console.log('weather effect')
        axios
            .get('http://api.weatherstack.com/current?access_key=0396f271748b819f5f60e637a04047bf&query=' + country[0].capital)
            .then(response => {
                console.log('weather promise fulfilled')
                setWeather(response.data)
            })
    }, [country])

    console.log('render weather', weather)
    console.log('country:', country)

    const single = () =>
        country.map(c =>
            <div key={c.name}>
                <h2>{c.name}</h2>
                <span>capital: {c.capital}</span><br />
                <span>population: {c.population}</span>
                <h3>languages</h3>
                <ul>
                    {c.languages.map(lang => (
                        <li key={lang.name}>{lang.name}</li>
                    ))}
                </ul>
                <span><img src={c.flag} alt={'flag of ' + c.name} className='flag' /></span>
                <h3>Weather in {c.capital}</h3>
                <Weather weather={weather}/>
            </div>
        )

    return (
        <div>
            {single()}
        </div>
    )
}

const Weather = ({ weather }) => {
    if (weather.constructor !== Array) {
        return (
            <div>
                <span><strong>temperature:</strong> {weather.current.temperature} &deg;C</span><br />
                <span><img src={weather.current.weather_icons} alt='weather icon' className='weatherIcon' /></span><br />
        <span><strong>wind:</strong> {Math.round((weather.current.wind_speed/3.6*100)/100).toFixed(1)} m/s direction {weather.current.wind_dir}</span><br />
            </div>
        )
    } else {
        return (
            <div>
                <span>loading weather data…</span>
            </div>
        )
    }
}

export default Country