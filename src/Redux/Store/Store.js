import { createStore, combineReducers } from 'redux';// Import to create store and combine reducer
import Function from '../Reducer/Reducer';// Importing reducer from reducer folder

// Method to combile Multple reducers
let reducers = combineReducers({
  functions:Function
})

// A very simple store
let store = createStore(reducers); // Using combile reducer to create store,

export default store; //exporting store to use in App.js