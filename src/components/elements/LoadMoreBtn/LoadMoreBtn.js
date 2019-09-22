import React from 'react';

import PropTypes from 'prop-types'

import './LoadMoreBtn.css';

const LoadMoreBtn = ({onClick, text}) => {
    return (
        <div>
            <div className="rmdb-loadmorebtn" onClick={() => onClick(true)}>
                <p>{text}</p>
            </div>
        </div>
    )
}

// Prop type checking
LoadMoreBtn.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string
}

export default LoadMoreBtn;