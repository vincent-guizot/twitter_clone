import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { tweetReducer } from './reducers/tweetReducer'
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    tweetReducer,
    userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))


export default store