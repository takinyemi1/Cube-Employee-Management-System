import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Button from 'react-bootstrap/Button'
import { useAuth } from "../../context/authContext"

const Navbar = () => {
    const {user, logout} = useAuth()

    return (
        <div className="flex items-center justify-between h-12 px-6 text-white" style={{fontFamily: "Dosis", backgroundColor: "#123999"}}>
            <p className="font-bold m-0">Welcome, {user.name}</p>
            <Button className="btn btn-outline-primary px-4 py-1" style={{backgroundColor: "#73d66c"}} onClick={() => logout()}>Logout</Button>
        </div>
    )
}

export default Navbar