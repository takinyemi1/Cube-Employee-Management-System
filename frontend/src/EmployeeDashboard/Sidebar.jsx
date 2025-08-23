import React from "react"
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuth } from "../context/authContext"

const Sidebar = () => {
    const iconStyle = {
        color: "#73d66c"
    }

    const {user} = useAuth();

    return (
        <div className="text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64" style={{ backgroundColor: "#142566" }}>
            <div className="h-12 flex items-center text-center justify-center" style={{fontFamily: "Dosis", backgroundColor: "#123999"}}>
                {/* navbar title */}
                <a className="text-white font-bold text-decoration-none text-large text-center" href="/">
                    Cube Employee Management System
                </a>
            </div>
            <div className="px-4" style={{fontFamily: "Dosis"}}>
                <NavLink to="/employee-dashboard"
                    className={({ isActive }) => `${isActive ? "bg-blue-500" : " "} text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline`}
                    // so there aren't two pages active
                    end>
                    <i className="bi bi-speedometer me-3" style={iconStyle}></i>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`}
                    className={({ isActive }) => `${isActive ? "bg-blue-500" : " "} text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline`}
                    end>
                    <i className="bi bi-person-fill me-3" style={iconStyle}></i>
                    <span>Profile</span>
                </NavLink>
                <NavLink to="/employee-dashboard/requests" 
                    className={({ isActive }) => `${isActive ? "bg-blue-500" : " "} text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline`}>
                    <i className="bi bi-building-fill me-3" style={iconStyle}></i>
                    <span>Time Off & Requests</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/salary/${user._id}`} 
                    className={({ isActive }) => `${isActive ? "bg-blue-500" : " "} text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline`}>
                    <i className="bi bi-calendar-event-fill me-3" style={iconStyle}></i>
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/employee-dashboard/settings" 
                    className={({ isActive }) => `${isActive ? "bg-blue-500" : " "} text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline`}>
                    <i className="bi bi-gear-fill me-3" style={iconStyle}></i>
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar