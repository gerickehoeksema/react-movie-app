import React from 'react';

import PropTypes from 'prop-types';

// Router
import { Link } from 'react-router-dom';

import './MovieThumb.css';

// Stateless functional component
const MovieThumb = ({clickable, movieId, movieName, image}) => {
    return (
        <div className="rmdb-moviethumb">
            { clickable 
                ? 
                <Link to={{ pathname: `/${movieId}`, movieName: `${movieName}` }}>
                    <img src={image} alt="moviethumb" />
                </Link>
                :
                <img src={image} alt="moviethumb" />
            }
        </div>
    )
}

// Prop type checking
MovieThumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    movieName: PropTypes.string
}

export default MovieThumb;