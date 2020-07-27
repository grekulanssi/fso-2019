const initialState = ''
let timeoutHandle = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.data
  default: return state
  }
}

export const setNotification = (notificationText, duration) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: notificationText
    })
    if (timeoutHandle) clearTimeout(timeoutHandle)
    timeoutHandle = setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        data: ''
      })
    }, duration * 1000)
  }
}

export default notificationReducer