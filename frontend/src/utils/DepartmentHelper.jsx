import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "Serial Number",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
]

export const DepartmentButtons = ({DepId, onDepartmentDelete}) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this department?")
        if (confirm) {
            try {
                const response = await axios.delete(
                `http://localhost:3000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    onDepartmentDelete(id)
                }

            } catch(error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button 
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}>
                Edit Department
            </button>

            <button className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => handleDelete(DepId)}>
                Delete Department
            </button>
        </div>
    )
}