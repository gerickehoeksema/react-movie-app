import React from 'react'

// Configs
import {
    IMAGE_BASE_URL
    ,BACKDROP_SIZE
} from '../../../config';

// styles
import FontAwesome from 'react-fontawesome';
import './MovieInfo.css';

// Components
import MovieThumb from '../MovieThumb/MovieThumb';

const MovieInfo = (props) => {
    return (
        <div className="rmdb-movieinfo"
            style={{
                background: props.movie.brackdrop_path ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.brackdrop_path})` : '#000'
            }}
        >
            <div className="rmdb-movieinfo-content">
                <div className="rmdb-movieinfo-thumb">
                    <MovieThumb 
                        image={props.movie.poster_path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.poster_path}` : './images/no_image.jpg'}
                        clickable={false}
                    />
                </div>
                <div className="rmdb-movieinfo-text">
                    <h1>{props.movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{props.movie.overview}</p>
                    <h3>IMDB RATING</h3>
                    <div className="rmd-rating">
                        <meter min="0" max="100" optimun="100" low="40" high="70" value={props.movie.vote_average * 10}></meter>
                        <p className="rmdb-score">{props.movie.vote_average}</p>
                    </div>
                    {props.directors.length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}
                    {props.directors.map((element,i) => {
                        return <p key={i} className="rmdb-director">{element.name}</p>
                    })}
                </div>
                <FontAwesome className="fa-film" name="film" size="5x" />
            </div>
        </div>
    )
}

export default MovieInfo;