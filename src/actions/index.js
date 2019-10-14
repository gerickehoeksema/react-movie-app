// Configs
import { API_URL ,API_KEY } from '../config'

import { fetchMovies } from '../helpers'

//#region  Home Action Types
export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const LOAD_MORE_MOVIES = 'LOAD_MORE_MOVIES';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';
export const SET_POPULAR_PERSISTED_STATE = 'SET_POPULAR_PERSISTED_STATE';
//#endregion

//#region  Movie Action Types
export const GET_MOVIE = 'GET_MOVIE';
export const CLEAR_MOVIE = 'CLEAR_MOVIE';
export const SET_MOVIE_PERSISTED_STATE = 'SET_MOVIE_PERSISTED_STATE';

//#endregion

//#region Shared Action Types
export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER';
//#endregion

//#region Shared Action Creators
export function showLoadingSpinner() {
    return {
        type: SHOW_LOADING_SPINNER,
        payload: null
    }
}
//#endregion

//#region Home Action Creators
export function getPopularMovies() {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&langauge=en-US&page=1`;
    const request = fetchMovies(endpoint);
    
    return {
        type: GET_POPULAR_MOVIES,
        payload: request
    }
}

export function searchMovies(searchTerm) {
    let endpoint;
    if(!searchTerm) {
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&langauge=en-US&page=1`
    }
    else{
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&langauge=en-US&query=${searchTerm}`
    }

    const request = fetchMovies(endpoint, result => {
        return {
            ...result,
            searchTerm
        }
    });

    return {
        type: SEARCH_MOVIES,
        payload: request
    }
}

export function loadMoreMovies(searchTerm, currentPage) {
    let endpoint;

    if(!searchTerm) {
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&langauge=en-US&page=${currentPage + 1}`
    }
    else{
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&langauge=en-US&query=${searchTerm}`
    }

    const request = fetchMovies(endpoint);

    return {
        type: LOAD_MORE_MOVIES,
        payload: request
    }
}

export function clearMovies() {
    return {
        type: CLEAR_MOVIES,
        payload: null
    }
}

export function setPopularPersistedState(state) {
    return {
        type: SET_POPULAR_PERSISTED_STATE,
        payload: state
    }
}
//#endregion

//#region Movie Action Creators
export function clearMovie() {
    return {
        type: CLEAR_MOVIE,
        payload: null
    }
}

export function getMovie(movieId) {
    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&langauge=en-US`;
    let newState = {};

    const request = fetchMovies(endpoint, result => {
        if (result.status_code) {
            // If we don't find any movie
            return newState;
        }
        else {
            newState = {movie: result };
            endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            return fetchMovies(endpoint, creditsResult => {
                const directors = creditsResult.crew.filter(member => member.job === "Director");
                
                newState.actors = creditsResult.cast;
                newState.directors = directors;

                return newState;
            })
        }
    })
    .catch(error => console.log('Error: ', error))
    
    return {
        type: GET_MOVIE,
        payload: request
    }
}

export function setMoviePersistedState(state) {
    return {
        type: SET_MOVIE_PERSISTED_STATE,
        payload: state
    }
}
//#endregion

// createEndpoint = (type, loadMore, searchTerm) => {
//     return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${loadMore && this.state.currentPage + 1}&query=${searchTerm}`;
// }