import React from "react"
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const AdminSidebar = () => {
    const iconStyle = {
        color: "#73d66c"
    }

    return (
        <div className="bg-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64" style={{ backgroundColor: "#142566" }}>
            <div className="bg-600 h-12 flex items-center text-center justify-center" style={{fontFamily: "Dosis", backgroundColor: "#123999"}}>
                {/* navbar title */}
                <a className="text-white font-bold text-decoration-none text-large text-center" href="/">
                    Employee Management System
                </a>
            </div>
            <div className="px-4" style={{fontFamily: "Dosis"}}>
                <NavLink to="/admin-dashboard"
                    className={({ isActive }) => `${isActive ? "bg-blue-500" : " "} text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline`}
                    // so there aren't two pages active
                    end>
                    <i className="bi bi-speedometer me-3" style={iconStyle}></i>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/employee-dashboard" className="text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline">
                    <i className="bi bi-person-fill me-3" style={iconStyle}></i>
                    <span>Employee</span>
                </NavLink>
                <NavLink to="/admin-dashboard/departments" 
                    className={({ isActive }) => `${isActive ? "bg-blue-500" : " "} text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline`}>
                    <i className="bi bi-building-fill me-3" style={iconStyle}></i>
                    <span>Departments</span>
                </NavLink>
                <NavLink to="/employee-dashboard" className="text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline">
                    <i className="bi bi-calendar-event-fill me-3" style={iconStyle}></i>
                    <span>Time Off & Requests</span>
                </NavLink>
                <NavLink to="/employee-dashboard" className="text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline">
                    <i className="bi bi-cash me-3" style={iconStyle}></i>
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/employee-dashboard" className="text-white flex items-center space-x-4 block py-2.5 px-4 rounded no-underline">
                    <i className="bi bi-gear-fill me-3" style={iconStyle}></i>
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar