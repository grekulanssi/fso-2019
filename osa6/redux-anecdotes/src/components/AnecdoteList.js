import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVoteTo(id))

        const anecdoteToVote = anecdotes.find(a => a.id === id)
        console.log('anecdoteToVote:', anecdoteToVote)
        dispatch(notify(`You voted "${anecdoteToVote.content}"`))
        setTimeout(() => {
        dispatch(notify(''))
      }, 5000)
    }

    return(
    <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    )}
    </div>
    )
}

export default AnecdoteList