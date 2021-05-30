import { LANGUAGE_CREATE_FAIL, LANGUAGE_CREATE_REQUEST, LANGUAGE_CREATE_RESET, LANGUAGE_CREATE_SUCCESS, LANGUAGE_DETAIL_FAIL, LANGUAGE_DETAIL_REQUEST, LANGUAGE_DETAIL_SUCCESS, LANGUAGE_LIST_FAIL, LANGUAGE_LIST_REQUEST, LANGUAGE_LIST_SUCCESS } from "../constants/languageConstants";

export const languageListReducer = (
    state = { loading: true, languages: [] },
    action
) => {
    switch (action.type) {
        case LANGUAGE_LIST_REQUEST:
            return { loading: true };
        case LANGUAGE_LIST_SUCCESS:
            return { loading: false, languages: action.payload };
        case LANGUAGE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const languageDetailsReducer = (
    state = { loading: true, language: {} },
    action
) => {
    switch (action.type) {
        case LANGUAGE_DETAIL_REQUEST:
            return { loading: true };
        case LANGUAGE_DETAIL_SUCCESS:
            return { loading: false, language: action.payload };
        case LANGUAGE_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const languageCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case LANGUAGE_CREATE_REQUEST:
            return { loading: true };
        case LANGUAGE_CREATE_SUCCESS:
            return { loading: false, success: true, language: action.payload };
        case LANGUAGE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case LANGUAGE_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
