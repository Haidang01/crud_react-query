import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ auth }: { auth: boolean }) => {
    return auth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
