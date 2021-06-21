
import {    
    BUG_CREATE_FAIL,
    BUG_CREATE_REQUEST,
    BUG_CREATE_RESET,
    BUG_CREATE_SUCCESS,
    BUG_DETAIL_FAIL,
    BUG_DETAIL_REQUEST,
    BUG_DETAIL_SUCCESS,
    BUG_LIST_FAIL,
    BUG_LIST_REQUEST,
    BUG_LIST_SUCCESS,
    BUG_UPDATE_FAIL,
    BUG_UPDATE_REQUEST,
    BUG_UPDATE_RESET,
    BUG_UPDATE_SUCCESS
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

export const bugDetailsReducer = (
    state = { loading: true },
    action
) => {
    switch (action.type) {
        case BUG_DETAIL_REQUEST:
            return { loading: true };
        case BUG_DETAIL_SUCCESS:
            return { loading: false, bug: action.payload };
        case BUG_DETAIL_FAIL:
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

export const bugUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case BUG_UPDATE_REQUEST:
            return { loading: true };
        case BUG_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case BUG_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case BUG_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};