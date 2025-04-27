import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Button from 'react-bootstrap/Button'
import { useAuth } from "../../context/authContext"

const Navbar = () => {
    const {user} = useAuth()

    return (
        <div className="flex items-center text-white justify-between h-12 bg-300 px-5" style={{fontFamily: "Dosis", backgroundColor: "#123999"}}>
            <p className="font-bold">Welcome, {user.name}</p>
            <Button className="btn btn-outline-primary px-4 py-1 bg-700" style={{backgroundColor: "#73d66c"}}>Logout</Button>
        </div>
    )
}

export default Navbar