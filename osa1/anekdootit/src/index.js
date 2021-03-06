import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';


const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(6).fill(0))
    const [mostVotes, setMostVotes] = useState(0)
    //console.log("anecdotes pituus: ", anecdotes.length)
    //console.log("votes pituus: ", votes.length)
    //console.log("voten sisältö: " + votes)
    return (
        <div className="main-container">
            <h1>Anecdote of the day</h1>
            <div className="anecdote">
                <p>"{props.anecdotes[selected]}"</p>
            </div>
            <p>has {votes[selected]} votes</p>
            <Button label='vote' onClick={() => {
                //console.log("nyt klikattiin")
                const copy = [...votes]
                copy[selected] += 1
                // select the index whose value is highest:
                setMostVotes(copy.indexOf(Math.max(...copy)))
                setVotes(copy)
            }} />
            <Button label='next anecdote' onClick={() => setSelected(Math.floor(Math.random() * (anecdotes.length - 1 + 1)) + 0)} />
            <div>
                <h2>Anecdote with most votes</h2>
                <div className="anecdote">
                    <p>"{props.anecdotes[mostVotes]}"</p>
                </div>
                <p>has {votes[mostVotes]} votes</p>
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const Button = ({ onClick, label }) => {
    return (
        <div>
            <button onClick={onClick}>{label}</button>
        </div>
    )
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)