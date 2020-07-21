import React from 'react'
import { connect } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes

    const vote = (anecdote) => {
        props.addVoteTo(anecdote) //
        props.setNotification(`You voted "${anecdote.content}"`, 5) //
    }

    const oneAnec = (anecdote) => {
        return(
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
        )
    }

    return(
    <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote => oneAnec(anecdote))}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    addVoteTo,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)