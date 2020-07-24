import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const text = useSelector(state => state.notification.text)
  const isError = useSelector(state => state.notification.isError)

  if(text === '') return ''
  const cssClass = isError ? 'errorNotification' : 'infoNotification'
  return(
    <div className={cssClass}>
      <span>{text}</span>
    </div>
  )
}

export default Notification