import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment] = useState([])
    const [depLoading, setDepLoading] = useState(false)

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get(
                `http://localhost:3000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    setDepartment(response.data.department)
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

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(
                `http://localhost:3000/api/department/${id}`, department, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch(error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    };

    return (
        <>{depLoading ? <div className='text-black position-relative'>
            {/* <i className='bi bi-arrow-clockwise fa-2x' style={loadingStyle}></i>
            Loading... */}
            <div className='position-absolute top-50 start-50 translate-middle spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
            </div>
        </div> :

        <div className="p-6" style={{fontFamily: "Dosis", backgroundColor: "#f0f2cc"}}>
            <div className="max-w-3xl mx-auto mt-10 p-6 rounded-md shadow-md w-96" style={{backgroundColor: "#9c93db"}}>
                <h2 className="text-2xl text-white font-bold mb-6">Edit Department</h2>
                <form onSubmit={handleSubmit}>
                    {/* department name */}
                    <div className="mt-3">
                        <label 
                            htmlFor="dep_name" 
                            className="text-md font-medium text-gray-700">
                            Department Name
                        </label>
                        <input 
                            type="text"
                            name="dep_name"
                            onChange={handleChange}
                            value={department.dep_name}
                            className="mt-1 w-full p-6 border border-gray-300 rounded-md"  
                            placeholder="Department Name" 
                            required />
                    </div>

                    {/* description */}
                    <div className="mt-3">
                        <label 
                            htmlFor="description" 
                            className="block text-md font-medium text-gray-700">
                            Description
                        </label>
                        <textarea 
                            name="description"
                            placeholder="Description" 
                            onChange={handleChange}
                            value={department.description}
                            className="mt-1 p-6 block w-full border border-gray-300 rounded-md" 
                            rows="4" 
                        />
                    </div>
                    {/* buttons */}
                    {/* back button */}

                    <button 
                        type="submit" 
                        className="w-full mt-6 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Edit Department
                    </button>
                </form>
            </div>
        </div>
        }</>
    )
}

export default EditDepartment