import actionNames from "../actionNames"

const initialState = {
  error: "",
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionNames.APP_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case actionNames.REMOVE_APP_ERROR:
      return {
        ...state,
        error: "",
      }
    default:
      return state
  }
}

export default appReducer
