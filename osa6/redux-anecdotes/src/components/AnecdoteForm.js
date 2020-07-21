import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.aContent.value
        event.target.aContent.value = ''

        dispatch(createAnecdote(content))
        dispatch(setNotification(`You added "${content}"`, 5))
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="aContent" /></div>
                <button type="submit">create</button>
            </form>
      </div>
    )
}

export default AnecdoteForm