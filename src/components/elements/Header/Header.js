import React from 'react';

// Router
import { Link } from 'react-router-dom'

// Styles
import './Header.css';

// Stateless functional component
const Header = () => {
    return(
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <Link to="/">
                    <img className="rmdb-logo" src="./images/reactMovie_logo.png" alt="rmdb-logo" />
                </Link>
                <img className="rmdb-tmdb-logo" src="./images/tmdb_logo.png" alt="tmdb-logo" />
            </div>
        </div>
    )
}

export default Header;