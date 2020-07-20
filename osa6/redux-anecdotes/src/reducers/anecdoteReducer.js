import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  let newState = state
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      newState =  state.map(anecdote =>
        anecdote.id === id ? votedAnecdote : anecdote)
      break
    case 'NEW_ANECDOTE':
      if(action.data.content === '') break
      newState = [...state, action.data]
      break
    case 'INIT_ANECDOTES':
      newState = action.data
      break
    default: break
  }
  return newState.sort((a, b) => b.votes - a.votes)
}

export const addVoteTo = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log('newAnecdote:', newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer