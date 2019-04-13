import React from 'react';
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
                    <a href="/LogIn">Sign In</a>
                </li>
                <li>
                    <a href="/SignUp">Register</a>
                </li>
                <li>
                    <a href="/Dashboard">Dashboard</a>
                </li>
                <li>
                    <a href="/Form">Work Orders</a>
                </li>
                <li>
                    <a href="/">About</a>
                </li>
                <li>
                    <a href="/">Contact</a>
                </li>
            </ul>
        </nav>);
};

export default sideDrawer;