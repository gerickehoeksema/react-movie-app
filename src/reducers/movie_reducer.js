// Action Types
import * as actions from '../actions';

const defaultState = {
    movie: null,
    actors: [],
    directors: [],
    loading: false
}

export default function( state = defaultState, action ) {
    switch(action.type) {
        case actions.GET_MOVIE:
            return {
                ...state,
                movie: action.payload.movie,
                actors: action.payload.actors,
                directors: action.payload.directors,
                loading: false
            }
        case actions.SHOW_LOADING_SPINNER:
                return {
                    ...state,
                    laoding: true
                }
        case actions.CLEAR_MOVIE:
            return {
                ...state,
                movie: null,
                actors: [],
                directors: []
            }
        case actions.SET_MOVIE_PERSISTED_STATE:
                return {
                    ...state,
                    ...action.payload
                }
        default:
            return state;
    }
}