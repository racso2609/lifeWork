import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'



import{Raison} from "./Raison"


export const ConfigStore = ()=>{
    const stores = createStore(
        combineReducers({
            raisons: Raison
        }),applyMiddleware(thunk, logger)
    );
    return stores;
};