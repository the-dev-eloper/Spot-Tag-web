import Axios from 'axios';
import {
    LANGUAGE_CREATE_FAIL,
    LANGUAGE_CREATE_REQUEST,
    LANGUAGE_CREATE_SUCCESS,
    LANGUAGE_DELETE_FAIL,
    LANGUAGE_DELETE_REQUEST,
    LANGUAGE_DELETE_SUCCESS,
    LANGUAGE_DETAIL_FAIL,
    LANGUAGE_DETAIL_REQUEST,
    LANGUAGE_DETAIL_SUCCESS,
    LANGUAGE_LIST_FAIL,
    LANGUAGE_LIST_REQUEST,
    LANGUAGE_LIST_SUCCESS, 
    LANGUAGE_UPDATE_FAIL, 
    LANGUAGE_UPDATE_REQUEST,
    LANGUAGE_UPDATE_SUCCESS
} from '../constants/languageConstants';

export const listLanguages = () => async (dispatch) => {
    dispatch({
        type: LANGUAGE_LIST_REQUEST,
    });

    try {
        const { data } = await Axios.get('/api/v1/languages/');
        dispatch({ type: LANGUAGE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LANGUAGE_LIST_FAIL, payload: error.message });
    }
};

export const detailsLanguage = (languageId) => async (dispatch) => {
    dispatch({
        type: LANGUAGE_DETAIL_REQUEST,
        payload: languageId
    });

    try {
        const { data } = await Axios.get(`/api/v1/languages/${languageId}`);
        dispatch({ type: LANGUAGE_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LANGUAGE_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const createLanguage = () => async (dispatch, getState) => {

    dispatch({ type: LANGUAGE_CREATE_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();

    try {
        const { data } = await Axios.post(
            '/api/languages',
            {},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );

        dispatch({ type: LANGUAGE_CREATE_SUCCESS, payload: data.language });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({ type: LANGUAGE_CREATE_FAIL, payload: message });
    }
};

export const updateLanguage = (language) => async (dispatch, getState) => {

    dispatch({ type: LANGUAGE_UPDATE_REQUEST, payload: language });
    const {
        userSignin: { userInfo },
    } = getState();

    try {
        const { data } = await Axios.put(
            `/api/languages/${language._id}`,
            language,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );

        dispatch({ type: LANGUAGE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({ type: LANGUAGE_UPDATE_FAIL, payload: message });
    }
};

export const deleteLanguage = (languageId) => async (dispatch, getState) => {

    dispatch({ type: LANGUAGE_DELETE_REQUEST, payload: languageId });
    const {
        userSignin: { userInfo },
    } = getState();

    try {
        const { data } = await Axios.delete(`/api/languages/${languageId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: LANGUAGE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: LANGUAGE_DELETE_FAIL, payload: message });
    }
};