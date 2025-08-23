import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuth } from "../context/authContext";

const Summary = () => {
    const {user} = useAuth();
    return (
        <>
            <div className="max-w-3xl w-100 mx-auto p-6 rounded-md">
                <div className="rounded flex bg-white">
                    <div className="text-3xl flex justify-center items-center bg-blue-400 text-white px-4">
                        <i className="bi bi-person-fill"></i>
                    </div>

                    <div className="pl-4 py-1">
                        <p className="text-lg font-semibold">Welcome Back, <span className="text-xl font-bold">{user.name}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary;