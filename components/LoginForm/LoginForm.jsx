import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './LoginForm.scss'
import axios from 'axios';


const LoginForm = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();


    let handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // make sure to store response from the post request
            const res = await axios.post("http://localhost:8080/api/users/login", {
                // pass email / password entered in form as part of post (used for verification in the backend server)
                alias: event.target.username.value,
                password: event.target.password.value,
            });
            console.log(res.data);
            // store the token returned from our response above
            let token = res.data.token;
            // set the token using session storage
            sessionStorage.setItem("token", token);
            navigate("/my-account");
        } catch (error) {
            console.log(error);
            // handle any errors with state
            setError(error);
        }
    };

    return (
        <div className='form-box'>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form">
                    <h3 className="form__header">Please Log In</h3>
                    <label className='form__input-header'>
                        Username
                    </label>
                    <input type="text"
                        name="alias"
                        id="username"
                        className="form__name-input"
                        placeholder="Enter your username"
                    />
                    <label className='form__input-header'>
                        Password
                    </label>
                    <input type="password"
                        name="password"
                        id="password"
                        className="form__name-input"
                        placeholder="Enter your password"
                    />
                    <button
                        // onSubmit={handleSubmit}
                        type="submit"
                        className="form__submit-btn">

                        Log in
                    </button>
                    <Link to={"/signup"}>
                        <p className="form__subtext">----- Sign Up -----</p>
                    </Link>
                </div>
            </form>

        </div>
    )
}

export default LoginForm;