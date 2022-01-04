import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"

import appReducer from "./reducers/appReducer"
import eventReducer from "./reducers/eventReducer"
import taskReducer from "./reducers/taskReducer"

const rootReducer = combineReducers({
  event: eventReducer,
  task: taskReducer,
  app: appReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
