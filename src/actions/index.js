// Configs
import { API_URL ,API_KEY } from '../config'

//#region  Home Action Types
export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const LOAD_MORE_MOVIES = 'LOAD_MORE_MOVIES';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';
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
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}$langauge=en-US$page=1`;
    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        return result;
    })
    .catch(error => console.log('Error: ', error))
    console.log('getPopularMovies', request)
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

    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        return { ...result, searchTerm };
    })
    .catch(error => console.log('Error: ', error))

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
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&langauge=en-US&query=${searchTerm}&page=${currentPage + 1}`
    }

    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        return result;
    })
    .catch(error => console.log('Error: ', error))

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
//#endregion

// createEndpoint = (type, loadMore, searchTerm) => {
//     return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${loadMore && this.state.currentPage + 1}&query=${searchTerm}`;
// }