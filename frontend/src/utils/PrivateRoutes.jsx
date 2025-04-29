import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth()

    const loadingStyle = {
        backgroundColor: "#8bc527",
    }

    if (loading) {
        // center and make larger (loading...)
        return <div className='text-black position-relative'>
            {/* <i className='bi bi-arrow-clockwise fa-2x' style={loadingStyle}></i>
            Loading... */}
            <div className='position-absolute top-50 start-50 translate-middle spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
            </div>
        </div>
    }

    return user ? children : <Navigate to="/login" />
}

export default PrivateRoutes