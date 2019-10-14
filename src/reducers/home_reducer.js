// Action Types
import * as actions from '../actions';

const defaultState = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
}

export default function( state = defaultState, action) {
    switch(action.type) {
        case actions.GET_POPULAR_MOVIES:
            console.info('GET_POPULAR_MOVIES', action.payload.results)
            return {
                ...state,
                movies: action.payload.results,
                heroImage: state.heroImage || action.payload.results[0],
                loading: false,
                currentPage: action.payload.page,
                totalPages: action.payload.total_pages,
                searchTerm: ''
            }
        case actions.LOAD_MORE_MOVIES:
            return {
                ...state,
                movies: [...state.movies, ...action.payload.results],
                loading: false,
                currentPage: action.payload.page,
                totalPages: action.payload.total_pages
            }
        case actions.SEARCH_MOVIES:
            return {
                ...state,
                movies: [...state.movies, ...action.payload.results],
                loading: false,
                currentPage: action.payload.page,
                totalPages: action.payload.total_pages,
                searchTerm: action.payload.searchTerm
            }
        case actions.CLEAR_MOVIES:
            return {
                ...state,
                movies: []
            }
        case actions.SHOW_LOADING_SPINNER:
            return {
                ...state,
                laoding: true
            }
        case actions.SET_POPULAR_PERSISTED_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}