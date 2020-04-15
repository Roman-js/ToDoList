//import React from 'react';
import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";



const rootReducer = combineReducers({todolist: reducer})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
