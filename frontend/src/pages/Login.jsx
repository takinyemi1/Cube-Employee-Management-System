import React, { useState } from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault();
        // alert("Button clicked")
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {email, password}
            );

            if (response.data.success) {
                // store token in local storage
                login(response.data.user);
                console.log(response.data.user)
                localStorage.setItem("token", response.data.token);

                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate('/employee-dashboard')
                }
            }
        } catch(error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error")
            }
        }
    };

    // password: admin
    
    const backgroundStyle = {
        backgroundColor: "#2748a5",
        fontFamily: "Dosis",
        color: "black"
    };

    const links = {
        textDecoration: "none"
    }

    return (
        <div className = "flex flex-col items-center text-black justify-center" style = {backgroundStyle}>
            {/* <div className="mb-3"></div> */}
            {/* <h2 className="text-white"><b>Employee Management System</b></h2> */}
            <div className="container py-5 h-50">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{borderRadius: "1rem"}}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="../assets/cubes-logo.gif" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}}></img>
                                </div>

                                <div className="col-md-6 col-lg-7 d-flex align-items-center position-relative">
                                    
                                    <div>
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <Form onSubmit={handleSubmit}>
                                                {/* logo */}
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <a href="/"><i className="bi bi-boxes fa-2x me-3" style={{color: "#8bc527"}}></i></a>
                                                    <span className="h1 fw-bold mb-0">Cube Employee Management System</span>
                                                </div>
                                                <h2 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h2>
                                                
                                                {/* error message */}
                                                {error && <p className="text-red-500">{error}</p>}

                                                {/* email input */}
                                                <div data-bs-input-init className="form-outline mb-4">
                                                    <label htmlFor = "email" className="form-label">Email</label>
                                                    <input type = "email" placeholder = "example@email.com" className="form-control form-control-lg"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required />
                                                </div>

                                                {/* password input */}
                                                <div>
                                                    <label htmlFor = "password" className="form-label">Password</label>
                                                    <input type = "password" placeholder = "********" className="form-control form-control-lg"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required />
                                                </div>

                                                {/* login button */}
                                                <div className="pt-3 mb-4">
                                                    <Button data-bs-button-init className="btn" type="submit" style={{backgroundColor: "#8bc527", border: "none"}}>Login</Button>
                                                </div>

                                                {/* forgot password */}
                                                <a className="small text-muted" href="#">Forgot Password?</a>
                                                <p className="mb-3 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="#" style={{color: "#393f81"}}>Register here</a></p>
                                                <a href="#" className="small text-muted" style={{links}}> Terms of Use.</a>
                                                <br></br>
                                                <a href="#" className="small text-muted">Privacy Policy</a>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login