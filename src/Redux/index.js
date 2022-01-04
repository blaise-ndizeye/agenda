import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"

import eventReducer from "./reducers/eventReducer"
import taskReducer from "./reducers/taskReducer"

const rootReducer = combineReducers({
  event: eventReducer,
  task: taskReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
