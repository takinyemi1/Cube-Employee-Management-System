import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "60px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "180px"
    },
    {
        name: "Profile",
        selector: (row) => (
            <img
                className="w-50"
                src={`http://localhost:3000/uploads/${row.profileImage}`}
                alt="Profile Picture"
                style={{
                    borderRadius: "50px",
                    margin: "auto",
                }}
                onError={(e) => e.target.style.display = 'none'}
            />
        ),
        // selector: (row) => (row.profileImage),
        sortable: false,
        width: "70px",
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "150px"
    },
    {
        name: "Date of Birth",
        selector: (row) => row.dob,
        sortable: true,
        width: "180px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true",
    },
];

export const fetchDepartments = async () => {
    let departments;
    // implements logic on how to fetch departments (IT, Business, etc.)
    try {
        const response = await axios.get(
            'http://localhost:3000/api/department', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.data.success) {
            departments = response.data.departments
        }

    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments;
};

// employees for salary form
export const getEmployees = async (id) => {
    let employees;
    try {
        const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(response);

        if (response.data.success) {
            employees = response.data.employees;
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
    return employees;
}

export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-green-500 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}>
                View
            </button>

            <button className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}>
                Edit
            </button>

            <button className="px-3 py-1 bg-yellow-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}>
                Salary
            </button>

            <button className="px-3 py-1 bg-red-600 text-white rounded"
            >
                Leave
            </button>
        </div>
    )
}