import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from "../EmployeeDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from '../components/dashboard/Navbar';

const EmployeeDashboard = () => {
    return (
        <div className="flex" style={{backgroundColor: "#f0f2cc", fontFamily: "Dosis", color: "black"}}>
            <Sidebar />
            <div className="flex-1 ml-64 h-screen">
                <Navbar />
                {/* dynamically used to display child components */}
                <Outlet />
            </div>
        </div>
    )
}

export default EmployeeDashboard