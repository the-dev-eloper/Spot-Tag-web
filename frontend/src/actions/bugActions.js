import Axios from 'axios';
import {
    BUG_CREATE_FAIL,
    BUG_CREATE_REQUEST,
    BUG_CREATE_SUCCESS,
    BUG_DELETE_FAIL,
    BUG_DELETE_REQUEST,
    BUG_DELETE_SUCCESS,
    BUG_DETAIL_FAIL,
    BUG_DETAIL_REQUEST,
    BUG_DETAIL_SUCCESS,
    BUG_LIST_FAIL,
    BUG_LIST_REQUEST,
    BUG_LIST_SUCCESS,
    BUG_UPDATE_FAIL,
    BUG_UPDATE_REQUEST,
    BUG_UPDATE_SUCCESS
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

export const detailsBug = (bugId) => async (dispatch) => {
    dispatch({ type: BUG_DETAIL_REQUEST, payload: bugId });

    try {
        const { data } = await Axios.get(`/api/bugs/${bugId}`);
        dispatch({ type: BUG_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BUG_DETAIL_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        });
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

export const updateBug = (bug) => async (dispatch, getState) => {

    dispatch({ type: BUG_UPDATE_REQUEST, payload: bug });
    const {
        userSignin: { userInfo },
    } = getState();

    try {
        const { data } = await Axios.put(`/api/bugs/${bug._id}`, bug, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: BUG_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({ type: BUG_UPDATE_FAIL, payload: message });
    }
};

export const deleteBug = (bugId) => async (dispatch, getState) => {

    dispatch({ type: BUG_DELETE_REQUEST, payload: bugId });
    const {
        userSignin: { userInfo },
    } = getState();

    try {
        const { data } = await Axios.delete(`/api/bugs/${bugId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: BUG_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: BUG_DELETE_FAIL, payload: message });
    }
};