import Axios from 'axios';
import {
    BUG_CREATE_FAIL,
    BUG_CREATE_REQUEST,
    BUG_CREATE_SUCCESS,
    BUG_LIST_FAIL,
    BUG_LIST_REQUEST,
    BUG_LIST_SUCCESS
} from "../constants/bugConstants";

export const listBugs = () => async (dispatch) => {

    dispatch({ type: BUG_LIST_REQUEST });

    try {
        const { data } = await Axios.get('/api/bugs');
        dispatch({ type: BUG_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BUG_LIST_FAIL, payload: error.message });
    }
};

export const createBug = () => async (dispatch, getState) => {
    dispatch({ type: BUG_CREATE_REQUEST });
    const {
        userSignin: { userInfo }
    } = getState();

    try {
        const { data } = await Axios.post(
            '/api/bugs',
            {},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );
        dispatch({ type: BUG_CREATE_SUCCESS, payload: data.bug });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({ type: BUG_CREATE_FAIL, payload: message });
    }
};
