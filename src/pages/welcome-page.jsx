import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/auth-slice'


function WelcomePage() {
    
    const user = useSelector(selectCurrentUser)
  
    return (
    <div>Welcome: {user}</div>
  )
}

export default WelcomePage