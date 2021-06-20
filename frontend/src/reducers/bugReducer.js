
import {    
    BUG_CREATE_FAIL,
    BUG_CREATE_REQUEST,
    BUG_CREATE_RESET,
    BUG_CREATE_SUCCESS,
    BUG_LIST_FAIL,
    BUG_LIST_REQUEST,
    BUG_LIST_SUCCESS
} from "../constants/bugConstants";

export const bugListReducer = (
    state = { loading: true, bugs: [] },
    action
) => {
    switch(action.type) {
        case BUG_LIST_REQUEST:
            return { loading: true };
        case BUG_LIST_SUCCESS:
            return { loading: false, bugs: action.payload };
        case BUG_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bugCreateReducer = (state = {}, action) => {
    switch (action.type) {

        case BUG_CREATE_REQUEST:
            return { loading: true };
        case BUG_CREATE_SUCCESS:
            return { loading: false, success: true, bug: action.payload };
        case BUG_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case BUG_CREATE_RESET:
            return {};
        default:
            return state;
    }
};