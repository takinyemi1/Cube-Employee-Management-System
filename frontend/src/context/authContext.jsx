// handles user information
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext()
const authContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token')

                if (token) {
                    const response = await axios.get('http://localhost:3000/api/auth/verify', {
                        headers: {
                            "Authorization": `Bearer ${token}` // the server side will consider it as authorization
                        }
                    })
    
                    if (response.data.success) {
                        // means that the user is authenticated
                        setUser(response.data.user)
                    }
                } else {
                    // navigate to login
                    setUser(null)
                }
            } catch(error) {
                if (error.response && !error.response.data.error) {
                    // navigate the user back to the login page
                    setUser(null)
                }
            } finally {
                setLoading(false)
            }
        }
        verifyUser()

    }, [])

    // login function to store infor in user
    const login = (user) => {
        setUser(user)
    }

    // logout function
    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

    return (
        <userContext.Provider value={{user, login, logout, loading}}>
            {/* parsing the children */}
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => useContext(userContext)
export default authContext