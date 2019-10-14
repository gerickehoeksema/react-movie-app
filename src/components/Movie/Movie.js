import React from 'react';

// Components
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';

// styles
import './Movie.css';

// Functional component
const Movie = ({ movie, directors, actors, loading}) => (
    <div className="rmdb-movie">
        { movie 
        ?
        <div>
            <Navigation 
                movie={movie.original_title} 
            />
            <MovieInfo 
                movie={movie} 
                directors={directors} 
            />
            <MovieInfoBar 
                time={movie.runtime} 
                budget={movie.budget} 
                revenue={movie.revenue} 
            />
        </div>
        :
        null
        }
        { actors
        ?
        <div className="rmdb-movie-grid">
            <FourColGrid 
                header={'Actors'}
            >
                {actors.map((element,i) => {
                    return <Actor key={i} actor={element} />
                })}
            </FourColGrid>
        </div>
        :
        null
        }
        { (!actors && !loading) ? <h1>No Movie Found</h1> : null }
        { loading ? <Spinner /> : null }
    </div>
)

export default Movie;