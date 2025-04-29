import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {

    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete = async (id) => {
        const data = departments.filter(dep => dep._id !== id)
        setDepartments(data)
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get(
                'http://localhost:3000/api/department', {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.departments.map((dep) => (
                        {
                            _id: dep._id,
                            sno: sno++,
                            dep_name: dep.dep_name,
                            action: (<DepartmentButtons DepId={dep._id}
                                onDepartmentDelete={onDepartmentDelete} />),
                        }
                    ))
                    setDepartments(data);
                    setFilteredDepartments(data);
                }

            } catch(error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDepLoading(false)
            }
        };
        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))

        setFilteredDepartments(records)
    }

    return (
        <>{depLoading ? <div className='text-black position-relative'>
            <div className='position-absolute top-50 start-50 translate-middle spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
            </div>
        </div> :
        
        <div className="p-6" style={{fontFamily: "Dosis", backgroundColor: "#f0f2cc"}}>
            <div>
                <h3 className="text-2xl font-bold">Manage Department</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                    type="text" 
                    className="px-4 py-0.5 w-50 h-8 rounded border" 
                    placeholder="Search by Department Name" 
                    onChange={filterDepartments} />
                <Link 
                    to="/admin-dashboard/add-department" 
                    className="px-4 py-1 bg-blue-400 text-white no-underline rounded">
                        Add Department
                </Link>
            </div>
            <div className="mt-5 rounded-md overflow-x-auto">
                <DataTable 
                    columns={columns}
                    data={filteredDepartments}
                    pagination
                />
            </div>
        </div>
        }</>
    );
};

export default DepartmentList;