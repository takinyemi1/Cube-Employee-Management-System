import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (settings.newPassword !== settings.confirmPassword) {
            setError("Password does not match.");
        } else {
            try {
                const response = await axios.put("http://localhost:3000/api/settings/change-password", settings, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.data.success) {
                    navigate(`/employee-dashboard/profile/${user._id}`);
                    setError("");
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    };

    return (
        <>
            <div className="p-6" style={{ fontFamily: "Dosis", backgroundColor: "#f0f2cc" }}>
                <div className="max-w-3xl mx-auto mt-10 p-8 rounded-md shadow-md w-96" style={{backgroundColor: "#a2e3f7ff"}}>
                    <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                    <p className="text-red-500">{error}</p>
                    <form onSubmit={handleSubmit}>
                        {/* Old Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Old Password
                            </label>
                            <input
                                type="password"
                                name="oldPassword"
                                placeholder="Change Password"
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter New Password"
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />

                            {/* Confirm Password */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Settings