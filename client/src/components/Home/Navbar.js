import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/billerInfo">BillerInfo</Link>
            </li>
            <li>
                <Link to="/personalInfo">PersonInfo</Link>
            </li>

            <li>
                <Link to="/login">SignIn</Link>
            </li>
            <li>
                <Link to="/SignUp">SignUp</Link>
            </li>
        </ul>
    );
}

export default NavBar;
