import React from 'react';

import PropTypes from 'prop-types';

// Styles
import './FourColGrid.css';

// Functional component
const FourColGrid = (props) => {
    const renderElements = () => {
        return props.children.map( (element, i) => {
            return (<div key={i} className="rmdb-grid-element">
                {element}
            </div>
            )
        })
    }

    return (
        <div className="rmdb-grid">
            { props.header && !props.loading ? <h1>{props.header}</h1> : null }
            <div className="rmdb-grid-content">
                {renderElements()}
            </div>
        </div>
    )
}

// Prop type checking
FourColGrid.propTypes = {
    header: PropTypes.string,
    loading: PropTypes.bool
}

export default FourColGrid;