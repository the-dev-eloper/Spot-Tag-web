import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bugCreateReducer, bugDeleteReducer, bugDetailsReducer, bugListReducer, bugUpdateReducer } from './reducers/bugReducer';
import { languageCreateReducer, languageDeleteReducer, languageDetailsReducer, languageListReducer, languageUpdateReducer } from './reducers/languageReducer';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducer';


const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
};

const reducer = combineReducers({
    languageList: languageListReducer,
    languageDetails: languageDetailsReducer,
    languageCreate: languageCreateReducer,
    languageUpdate: languageUpdateReducer,
    languageDelete: languageDeleteReducer,
    bugList: bugListReducer,
    bugDetails: bugDetailsReducer,
    bugCreate: bugCreateReducer,
    bugUpdate: bugUpdateReducer,
    bugDelete: bugDeleteReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
