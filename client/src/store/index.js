import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {tweetReducer} from './reducers/tweetReducer'

const reducer = combineReducers({
    tweetReducer
})

const store = createStore(reducer, applyMiddleware(thunk))


export default store