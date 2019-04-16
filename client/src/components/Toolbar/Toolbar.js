import React from 'react';
import { Link } from 'react-router-dom';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css'

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div>
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar__logo"><a href="/">Condo and Home Owner Association Portal</a></div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                    <li>
                        <Link to='/LogIn'>LogIn</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to='/SignUp'>Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;