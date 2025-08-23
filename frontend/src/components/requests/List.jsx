import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const RequestList = () => {
    const {user} = useAuth();
    const [requests, setRequests] = useState([]);
    // const [filteredRequests, setFilteredRequests] = useState([]);

    let sno = 1;

    const fetchTimeRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/requests/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);

            if (response.data.success) {
                setRequests(response.data.requests);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchTimeRequests();
    }, []);

    // const handleFilter = (e) => {
    //     const records = requests.filter((reqs) => (
    //         reqs.requestType.toLowerCase().includes(e.target.value.toLowerCase())
    //     ));
    //     setFilteredRequests(records);
    // };

    return (
        <>
            {requests ? (
            <div className="p-6" style={{ fontFamily: "Dosis", backgroundColor: "#f0f2cc" }}>
                <div>
                    <h3 className="text-2xl font-bold">Manage Time Off & Requests</h3>
                </div>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        className="px-4 py-0.5 w-50 h-8 rounded border"
                        placeholder="Search by Request Type"
                        // onChange={handleFilter}
                    />
                    <Link
                        to="/employee-dashboard/add-request"
                        className="px-4 py-1 bg-blue-400 text-white no-underline rounded">
                        Add New Request
                    </Link>
                </div>
                <br />

                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">S No</th>
                            <th className="px-6 py-3">Request Type</th>
                            <th className="px-6 py-3">From</th>
                            <th className="px-6 py-3">To</th>
                            <th className="px-6 py-3">Description</th>
                            {/* <th className="px-6 py-3">Applied Date</th> */}
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                                <tr
                                key={request._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{request.requestType}</td>
                                <td className="px-6 py-3">{new Date (request.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{new Date (request.endDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{request.reason}</td>
                                {/* <td className="px-6 py-3">{new Date (request.appliedDate).toLocaleDateString()}</td> */}
                                <td className="px-6 py-3">{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ): <div className='col text-center align-center bottom-50 translate-middle spinner-border' style={{margin: "auto"}} role='status'>
                <span className='sr-only'>Loading...</span>
            </div>}
        </>
    )
}

export default RequestList