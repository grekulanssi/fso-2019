import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [avg, setAvg] = useState(0)
    const [positive, setPositive] = useState(0)

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
                <Stats
                    good='good' vGood={good}
                    neutral='neutral' vNeutral={neutral}
                    bad='bad' vBad={bad} />
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

const Stats = ({ good, vGood, neutral, vNeutral, bad, vBad }) => {

    const all = vGood + vNeutral + vBad
    const avg = (vGood - vBad) / all
    const positive = vGood / all * 100

    return (
        <div>
            <p>{good} {vGood}</p>
            <p>{neutral} {vNeutral}</p>
            <p>{bad} {vBad}</p>
            <p>all {all}</p>
            <p>average {avg}</p>
            <p>positive {positive} %</p>
        </div>
    )
}

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

ReactDOM.render(<App />, document.getElementById('root'));

