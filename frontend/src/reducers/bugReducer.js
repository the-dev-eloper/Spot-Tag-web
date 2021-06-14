import { BUG_LIST_FAIL, BUG_LIST_REQUEST, BUG_LIST_SUCCESS } from "../constants/bugConstants";

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