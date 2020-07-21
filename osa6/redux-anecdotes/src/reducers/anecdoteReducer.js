import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  let newState = state
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data.votedAnecdote
      newState =  state.map(anecdote =>
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
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

export const addVoteTo = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(id)
    dispatch({
      type: 'VOTE',
      data: { votedAnecdote }
    })
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