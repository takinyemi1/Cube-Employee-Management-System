import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSalary = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log(response.data);

            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter((leave) =>
            leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <>
            {filteredSalaries === null ? (
                <div className='col text-center align-center bottom-50 translate-middle spinner-border' role='status'>
                    <span className='sr-only' style={{
                        margin: "auto",
                        alignItems: "center",
                    }}>Loading...</span>
                </div>) : (
                <div className="p-6" style={{ fontFamily: "Dosis", backgroundColor: "#f0f2cc" }}>
                    <div>
                        <div>
                            <h2 className="text-2xl font-bold">Salary History</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <input
                                type="text"
                                placeholder="Search by Employee Id"
                                className="border px-2 rounded-md py-0.5 border-gray-300 w-50"
                                onChange={filterSalaries}
                            />
                        </div>

                        {filteredSalaries.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-500 mt-5">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3">S No</th>
                                        <th className="px-6 py-3">Employee Id</th>
                                        <th className="px-6 py-3">Salary</th>
                                        <th className="px-6 py-3">Raises</th>
                                        <th className="px-6 py-3">Deductions</th>
                                        <th className="px-6 py-3">Total Salary</th>
                                        <th className="px-6 py-3">Pay Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSalaries.map((salary) => (
                                        <tr
                                            key={salary.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-3">{sno++}</td>
                                            <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                            <td className="px-6 py-3">{salary.generalSalary}</td>
                                            <td className="px-6 py-3">{salary.raises}</td>
                                            <td className="px-6 py-3">{salary.deductions}</td>
                                            <td className="px-6 py-3">{salary.netSalary}</td>
                                            <td className="px-6 py-3">
                                                {new Date(salary.payDate).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : <div className="text-center mt-6">No Records to Display</div>}
                    </div>
                </div>
            )
            }
        </>
    )
}

export default ViewSalary;