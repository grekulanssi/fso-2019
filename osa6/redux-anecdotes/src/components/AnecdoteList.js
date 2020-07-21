import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(addVoteTo(anecdote))
        dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
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

export default AnecdoteList