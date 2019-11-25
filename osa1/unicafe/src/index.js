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
                <Statistics
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

const Statistics = ({ good, vGood, neutral, vNeutral, bad, vBad }) => {

    if ((vGood + vNeutral + vBad) === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    const all = vGood + vNeutral + vBad
    const avg = (vGood - vBad) / all
    const positive = vGood / all * 100

    return (
        <div>
            <table>
                <tbody>
                    <Statistic text={good} value={vGood} />
                    <Statistic text={neutral} value={vNeutral} />
                    <Statistic text={bad} value={vBad} />
                    <Statistic text="all" value={all} />
                    <Statistic text="average" value={avg} />
                    <Statistic text="positive" value={positive + " %"} />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

ReactDOM.render(<App />, document.getElementById('root'));

