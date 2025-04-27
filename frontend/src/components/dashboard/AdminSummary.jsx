import React from "react"
import SummaryCard from "./SummaryCard"
import {FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers} from 'react-icons/fa'

const AdminSummary = () => {
    return (
        <div className="p-6" style={{fontFamily: "Dosis", backgroundColor: "#f0f2cc"}}>
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard icon={<FaUsers />} text="Total Employees" number={15} color="bg-cyan-400" />
                <SummaryCard icon={<FaBuilding />} text="Total Departments" number={8} color="bg-gray-400" />
                <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$1750" color="bg-green-600" />
            </div>

            <div className="mt-12">
                {/* text-center? */}
                <h4 className="text-2xl font-bold">Time Off & Requests</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <SummaryCard icon={<FaFileAlt />} text="Time Off Requested" number={7} color="bg-blue-700" />
                    <SummaryCard icon={<FaCheckCircle />} text="Time Off Request Approved" number={3} color="bg-green-800" />
                    <SummaryCard icon={<FaHourglassHalf />} text="Time Off Request Pending" number={2} color="bg-yellow-500" />
                    <SummaryCard icon={<FaTimesCircle />} text="Time Off Request Rejected" number={2} color="bg-red-600" />
                </div>
            </div>
        </div>
    )
}

// change color: bg-yellow-400

export default AdminSummary