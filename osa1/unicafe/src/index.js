import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header />
            <div>
                <Button label='good' onClick={() => setGood(good + 1)} />
                <Button label='neutral' onClick={() => setNeutral(neutral + 1)} />
                <Button label='bad' onClick={() => setBad(bad + 1)} />
            </div>
            <div>
                <h2>Statistics</h2>
            </div>
            <div>
                <Stats tone='good' value={good} />
                <Stats tone='neutral' value={neutral} />
                <Stats tone='bad' value={bad} />
            </div>
        </div>
    )
}

const Header = () => {

    return (
        <div>
            <h1>Give feedback</h1>
        </div>
    )
}

const Stats = ({ tone, value }) => {

    return (
        <p>{tone} {value}</p>
    )
}

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

ReactDOM.render(<App />, document.getElementById('root'));

