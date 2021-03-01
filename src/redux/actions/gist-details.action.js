import { FETCH_GIST_DETAILS_ERROR, FETCH_GIST_DETAILS_SUCCESS, FETCH_GIST_DETAILS_PENDING } from '../types/types';
import { GISTDETAILS_URL } from '../../constants/constant'


function fetchGistDetailsPending() {
    return {
        type: FETCH_GIST_DETAILS_PENDING
    }
}

function fetchGistDetailsSuccess(payload) {
    return {
        type: FETCH_GIST_DETAILS_SUCCESS,
        payload,
        isLoading: false
    }
}


function fetchGistDetailsError(error) {
    return {
        type: FETCH_GIST_DETAILS_ERROR,
        error,
        isLoading: false
    }
}


function getGistDetails(id) {
    return async (dispatch) => {
        dispatch(fetchGistDetailsPending());

        const url = `${GISTDETAILS_URL}/${id}`;
        try {
            const res = await fetch(url);
            const resJson = await res.json();
            if (resJson.forks.length) {
                dispatch(fetchGistDetailsSuccess(resJson));
            } else {
                dispatch(fetchGistDetailsError(`No forks found`));
            }

        } catch (error) {
            dispatch(fetchGistDetailsError(error));
        }
    }
}


export default getGistDetails;