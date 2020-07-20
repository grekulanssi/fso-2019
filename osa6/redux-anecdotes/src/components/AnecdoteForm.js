import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes' 

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.aContent.value
        event.target.aContent.value = ''

        const newAnecdote = await anecdoteService.createNew(content)
        console.log('newAnecdote:', newAnecdote)
        
        dispatch(createAnecdote(newAnecdote))
        dispatch(notify(`You added "${content}"`))
        setTimeout(() => {
        dispatch(notify(''))
      }, 5000)
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