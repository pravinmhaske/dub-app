import { FETCH_PUBLIC_GISTS_USER_ERROR, FETCH_PUBLIC_GISTS_USER_SUCCESS, FETCH_PUBLIC_GISTS_USER_PENDING } from '../types/types';


const initialState = {
    username: '',
    isLoading: false,
    error: null,
    gists: [],
}

export function UserPublicGistReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PUBLIC_GISTS_USER_PENDING:
            return { ...state, gists: [], isLoading: true, username: '', error: null };
        case FETCH_PUBLIC_GISTS_USER_SUCCESS:
            return { ...state, gists: [...action.payload], isLoading: false, error: null }
        case FETCH_PUBLIC_GISTS_USER_ERROR:
            return { ...state, gists: [], isLoading: false, username: action.username, error: action.error };
        default:
            return state;
    }
}

export const getUserPublicGistSuccess = (state) => state.UserPublicGist.gists;
export const getUserPublicGistPending = (state) => state.UserPublicGist.isLoading;
export const getUserPublicGistError = (state) => state.UserPublicGist.error;