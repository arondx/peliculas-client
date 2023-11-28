import React, { useEffect } from 'react'
import PageLoader from '../../../components/page-loader'

import { useNavigate } from 'react-router-dom'

import { useLogoutQuery } from '../auth-api-slice'
import { logout } from '../auth-slice'
import { useDispatch } from 'react-redux'

function LogoutView() {

    const { isSuccess, isLoading, error} = useLogoutQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            console.log(error)
        } else if (isSuccess) {
            localStorage.removeItem('persist')
            dispatch(logout())
            navigate('/login')
        }
    }, [isSuccess, error, navigate])
    
    return <PageLoader />
}

export default LogoutView