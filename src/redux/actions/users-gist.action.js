import { FETCH_PUBLIC_GISTS_USER_ERROR, FETCH_PUBLIC_GISTS_USER_PENDING, FETCH_PUBLIC_GISTS_USER_SUCCESS } from '../types/types';
import { USERPUBLICGIST_URL } from '../../constants/constant'


function fetchUserPublicGistPending() {
    return {
        type: FETCH_PUBLIC_GISTS_USER_PENDING
    }
}

function fetchUserPublicGistSuccess(UserPublicGist) {
    return {
        type: FETCH_PUBLIC_GISTS_USER_SUCCESS,
        payload: UserPublicGist,
        isLoading: false
    }
}


function fetchUserPublicGistError(error) {
    return {
        type: FETCH_PUBLIC_GISTS_USER_ERROR,
        error, isLoading: false
    }
}


function getUserPublicGist(username) {
    return async (dispatch) => {
        dispatch(fetchUserPublicGistPending());

        const url = `${USERPUBLICGIST_URL}/${username}/gists`;
        try {
            const res = await fetch(url);
            const resJson = await res.json();

            if (resJson.length) {
                dispatch(fetchUserPublicGistSuccess(resJson));
            } else {
                dispatch(fetchUserPublicGistError(`No Gists Found for the User -  ${username}`));
            }

        } catch (error) {
            dispatch(fetchUserPublicGistError(error));
        }
    }
}


export default getUserPublicGist;