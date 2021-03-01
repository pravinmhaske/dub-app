import { combineReducers } from 'redux';
import { UserPublicGistReducer } from './reducers/users-gist.reducer'
import { GistDetailsReducer } from './reducers/gist-details.reducer'

export default combineReducers({
    UserPublicGist: UserPublicGistReducer,
    GistDetails: GistDetailsReducer
});