import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';

<script
  src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossorigin>
</script>

const Login = () => {
    const backgroundStyle = {
        backgroundColor: "#2748a5",
        fontFamily: "Dosis",
        color: "black"
    };

    return (
        <div className = "flex flex-col vh-100 items-center text-black h-screen justify-center" style = {backgroundStyle}>
            <h2>Employee Management System</h2>
            <div className="container py-5 h-100">

            </div>
        </div>
    )
}

export default Login