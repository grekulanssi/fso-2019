import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'

const Notification = () => {
  const text = useSelector(state => state.notification.text)
  const isError = useSelector(state => state.notification.isError)

  if(text === '') return ''
  const cssClass = isError ? 'errorNotification' : 'infoNotification'
  return(
    <div className={cssClass}>
      <span><Typography variant='body2'>{text}</Typography></span>
    </div>
  )
}

export default Notification