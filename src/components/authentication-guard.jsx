import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentRoles } from '../features/auth/auth-slice'

function AuthenticationGuard({ allowedRoles }) {
    const token = useSelector(selectCurrentToken)
    const roles = useSelector(selectCurrentRoles)
    const location = useLocation()
  console.log(allowedRoles)
  console.log(roles)
  return (
    roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : token
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default AuthenticationGuard