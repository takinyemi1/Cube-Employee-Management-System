import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Salary = () => {
    // to display data use useEffect
    const [salary, setSalary] = useState({
        employeeId: null,
        generalSalary: 0,
        raises: 0,
        deductions: 0,
        payDate: null,
    });
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value);
        setEmployees(emps);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:3000/api/salary/add`, salary, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    };

    return (
        <>
            {departments ? (
                <div className="p-6" style={{ fontFamily: "Dosis", backgroundColor: "#f0f2cc" }}>
                    <div className="max-w-4xl mx-auto mt-10 p-8 rounded-md shadow-md" style={{ color: "white", backgroundColor: "#93c4dbff" }}>
                        <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ color: "black" }}>
                                {/* Department */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Department
                                    </label>
                                    <select
                                        name="department"
                                        onChange={handleDepartment}
                                        className="mt-1 p-2 block w-full border border-gray-700 rounded-md"
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((dep) => (
                                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Employees */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Employee
                                    </label>
                                    <select
                                        name="employeeId"
                                        onChange={handleChange}
                                        className="mt-1 p-2 block w-full border border-gray-700 rounded-md"
                                        required
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map((emp) => (
                                            <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* General Salary */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        General Salary
                                    </label>
                                    <input
                                        type="number"
                                        name="generalSalary"
                                        onChange={handleChange}
                                        placeholder="General Salary"
                                        className="mt-1 p-2 block w-full border border-gray-700 rounded-md"
                                        required
                                    />
                                </div>

                                {/* Salary */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Raises
                                    </label>
                                    <input
                                        type="number"
                                        name="raises"
                                        onChange={handleChange}
                                        placeholder="Raise Amount"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                {/* Deductions */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Deductions
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions"
                                        onChange={handleChange}
                                        placeholder="Deductions"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                {/* Deductions */}
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Net Salary
                                    </label>
                                    <input
                                        type="number"
                                        name="netSalary"
                                        onChange={handleChange}
                                        placeholder="Net Salary"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        required
                                    />
                                </div> */}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Pay Date
                                    </label>
                                    <input
                                        type="date"
                                        name="payDate"
                                        onChange={handleChange}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Add Employee
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='col text-center align-center bottom-50 translate-middle spinner-border' role='status'>
                    <span className='sr-only' style={{
                        margin: "auto",
                        alignItems: "center",
                    }}>Loading...</span>
                </div>)
            }
        </>
    )
}

export default Salary;