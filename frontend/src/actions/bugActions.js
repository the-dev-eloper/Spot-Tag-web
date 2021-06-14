import Axios from 'axios';
import {
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