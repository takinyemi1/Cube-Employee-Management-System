import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRequest = () => {
    const {user} = useAuth();
    const [request, setRequest] = useState({
        userId: user._id,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRequest((prevState) => ({...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/requests/add', request,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                navigate('/employee-dashboard/requests');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <div className="p-6" style={{ fontFamily: "Dosis", backgroundColor: "#f0f2cc" }}>
            <div className="max-w-4xl mx-auto mt-10 p-8 rounded-md shadow-md" style={{ color: "white", backgroundColor: "#9c93db" }}>
                <h2 className="text-2xl font-bold mb-6">Time Off Request</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4" style={{ color: "black" }}>
                        {/* Request Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Request Type
                            </label>
                            <select
                                name="requestType"
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required    
                            >
                                <option value="">Select Request Type</option>
                                <option value="Vacation Request (PTO)">Vacation Request (PTO)</option>
                                <option value="Annual Leave Request (PTO)">Annual Leave Request (PTO)</option>
                                <option value="Sabbatical Leave Request (PTO)">Sabbatical Leave Request (PTO)</option>
                                <option value="Medical Leave Request (PTO)">Medical Leave Request (PTO)</option>
                                <option value="Disability Leave Request (PTO)">Disability Leave Request (PTO)</option>
                                <option value="Parental Leave Request (PTO)">Parental Leave Request (PTO)</option>
                                <option value="Jury Duty Leave Request (PTO)">Jury Duty Leave Request (PTO)</option>
                                <option value="Emergency Leave Request (PTO)">Emergency Leave Request (PTO)</option>
                            </select>
                        </div>
                        
                        {/* From Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    From
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* To Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    To
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="reason"
                                placeholder="Reason for Request"
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Add Time Off Request
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddRequest