import { LANGUAGE_LIST_FAIL, LANGUAGE_LIST_REQUEST, LANGUAGE_LIST_SUCCESS } from "../constants/languageConstants";

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