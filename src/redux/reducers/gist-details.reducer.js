import { FETCH_GIST_DETAILS_ERROR, FETCH_GIST_DETAILS_PENDING, FETCH_GIST_DETAILS_SUCCESS } from '../types/types';


const initialState = {
    forks: [],
    isLoading: false,
    error: null,
}
export function GistDetailsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GIST_DETAILS_PENDING:
            return { ...state, isLoading: true, error: null, forks: [] };
        case FETCH_GIST_DETAILS_SUCCESS:
            return { ...state, isLoading: false, error: null, forks: [...action.payload.forks] }
        case FETCH_GIST_DETAILS_ERROR:
            return { ...state, isLoading: false, error: action.error, forks: [] };
        default:
            return state;
    }
}

export const getGistDetailsSuccess = (state) => state.GistDetails.forks;
export const getGistDetailsPending = (state) => state.GistDetails.isLoading;
export const getGistDetailsError = (state) => state.GistDetails.error;