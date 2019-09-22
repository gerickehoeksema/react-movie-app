import React from 'react';

// styles
import FontAwesome from 'react-fontawesome';
import './MovieInfoBar.css';

// Helpers
import { calcTime, convertMoney } from '../../../helpers.js'

// Stateless functional component
const MovieInfoBar = ({time, budget, revenue}) => (
    <div className="rmdb-movieinfobar">
        <div className="rmdb-movieinfobar-content">
            <div className="rmdb-movieinfobar-content-col">
                <FontAwesome className="fa-time" name="clock-o" size="2x" />
                <span className="rmdb-movieinfobar-info">Running time: {calcTime(time)}</span>
            </div>
            <div className="rmdb-movieinfobar-content-col">
                <FontAwesome className="fa-budget" name="money" size="2x" />
                <span className="rmdb-movieinfobar-info">Budget: {convertMoney(budget)}</span>
            </div>
            <div className="rmdb-movieinfobar-content-col">
                <FontAwesome className="fa-revenue" name="ticket" size="2x" />
                <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(revenue)}</span>
            </div>
        </div>
    </div>
)


export default MovieInfoBar;