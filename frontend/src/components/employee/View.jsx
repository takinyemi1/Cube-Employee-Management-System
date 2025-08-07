import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from "axios";
import { useState } from "react";

const View = () => {
    const {id} = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(
                `http://localhost:3000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(response.data)

                if (response.data.success) {
                    setEmployee(response.data.employee)
                }

            } catch(error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        };
        fetchEmployee();
    }, []);

    return (
        <>
            {employee ? (

            <div className="max-w-3xl mx-auto mt-10 p-8 rounded-md shadow-md"
                style={{fontFamily: "Dosis", backgroundColor: "#f0f2cc"}}>
                    <h2 className="text-2xl font-bold mb-8 text-center">Employee Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img 
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                border: "solid 2px #a2b673ff"
                            }} 
                            src={`http://localhost:3000/uploads/${employee.userId.profileImage}`} 
                            alt="Profile Picture" />
                    </div>
                    <div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Name:</p>
                            <p className="font-medium">{employee.userId.name}</p>
                        </div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Employee ID:</p>
                            <p className="font-medium">{employee.employeeId}</p>
                        </div>

                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Date of Birth:</p>
                            <p className="font-medium">
                                {new Date(employee.dob).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Gender:</p>
                            <p className="font-medium">
                                {employee.gender}
                            </p>
                        </div>

                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Department:</p>
                            <p className="font-medium">
                                {employee.department.dep_name}
                            </p>
                        </div>

                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Marital Status:</p>
                            <p className="font-medium">
                                {employee.maritalStatus}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ): <div className='col text-center align-center bottom-50 translate-middle spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
            </div>}
        </>
    )
}

export default View;