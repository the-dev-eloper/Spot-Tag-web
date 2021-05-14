import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { languageDetailsReducer, languageListReducer } from './reducers/languageReducer';


const initialState = {};

const reducer = combineReducers({
    languageList: languageListReducer,
    languageDetails: languageDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
