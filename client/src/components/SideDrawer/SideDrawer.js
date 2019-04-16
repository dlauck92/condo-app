import React from 'react';
import { Link } from 'react-router-dom'
// import { Redirect } from 'react-router-dom';
import './SideDrawer.css';






const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <li>
                    <Link to="/LogIn">Login</Link>
                </li>
                <li>
                    <Link to="/SignUp">Sign Up</Link>
                </li>
                <li>
                    <Link to="/Dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/Form">Work Orders</Link>
                </li>
                <li>
                    <Link to="/About">About</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
            </ul>

        </nav>

    );
}


export default sideDrawer;