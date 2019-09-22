import React from 'react';

// Router
import { Link } from 'react-router-dom';

// styles
import './Navigation.css'

// Stateless functional component
const Navigation = ({movie}) => (
    <div className="rmdb-navigation">
        <div className="rmdb-navigation-content">
            <Link to="/">
                <p>Home</p>
            </Link>
            <p>/</p>
            <p>{movie}</p>
        </div>
    </div>
)

export default Navigation;