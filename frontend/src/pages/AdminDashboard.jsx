import React from "react"
// import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuth } from "../context/authContext"
import AdminSidebar from "../components/dashboard/AdminSidebar"
import Navbar from "../components/dashboard/Navbar"
import { Outlet } from "react-router-dom"

const AdminDashboard = () => {
    const { user } = useAuth()
    return (
        // <div style={adminStyle}>Admin Dashboard {user && user.name}</div>
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-64 bg-100 h-screen">
                <Navbar />
                {/* dynamically used to display child components */}
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard