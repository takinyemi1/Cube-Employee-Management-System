import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployee, setFilteredEmployee] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                console.log(response.data);

                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.employees.map((emp) => (
                        {
                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department.dep_name,
                            name: emp.userId.name,
                            dob: new Date(emp.dob).toLocaleDateString(),
                            profileImage: emp.userId.profileImage,
                            action: (<EmployeeButtons Id={emp._id} />),
                        }
                    ));
                    setEmployees(data);
                    setFilteredEmployee(data);
                }

            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
        };
        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setFilteredEmployee(records);
    };

    return (
        <div className="p-6" style={{ fontFamily: "Dosis", backgroundColor: "#f0f2cc" }}>
            <div>
                <h3 className="text-2xl font-bold">Manage Employee</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    className="px-4 py-0.5 w-50 h-8 rounded border"
                    placeholder="Search by Employee Name"
                    onChange={handleFilter}
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-1 bg-blue-400 text-white no-underline rounded">
                    Add Employee
                </Link>
            </div>
            <br />
            <div className="data-table-employees mt-6">
                <DataTable columns={columns} data={filteredEmployee} pagination />
            </div>
        </div>
    )
}

export default List;