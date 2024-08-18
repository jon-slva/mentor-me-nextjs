import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.scss";


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // get token from session storage
        const token = sessionStorage.getItem("token");
        console.log(token);

        // handle if the token is not in session storage
        if (!token) return setFailedAuth(true);

        // make API request to get user info
        const getUserInfo = async () => {
            try {
                const res = await axios.get("http://localhost:8082/api/users/current", {
                    headers: {
                        Authorization: `Bearer ${token}`, // IMPORTANT: Authorization header must be formatted like this!
                    },
                });
                console.log(res);
                // update state with user data returned from our API request
                setUser(res.data);
            } catch (error) {
                // make sure any error prevent the user for accessing this dashbaord page
                setFailedAuth(true);
            }
        };

        getUserInfo();
    }, []);

    const handleLogout = () => {
        // remove the token from session storage
        sessionStorage.removeItem("token");
        // empty out the state for the user
        setUser(null);
        // update state checking if user has token
        setFailedAuth(true);
        // navigate user where to where we'd like to send them after they've logged out
        navigate("/login");
    };

    // this returned JSX should be handled first in the code (in order from top to bottom)
    // if the token is not present via our check earlier, they should only be able to
    // see this JSX informing them they need to login/authenticate
    if (failedAuth) {
        return (
            <main className="dashboard">
                <p>You must be logged in to see this page.</p>
                <p>
                    <Link to="/login">Log in</Link>
                </p>
            </main>
        );
    }

    // next, this returned JSX should handle the intermittent time it takes to
    // retrieve the data from our DB via our API (without this, errors will occur where user is being read as null)
    if (user === null) {
        return (
            <main className="dashboard">
                <p>Loading...</p>
            </main>
        );
    }

    return (
        <div>

        </div>
    )
}

export default Dashboard
