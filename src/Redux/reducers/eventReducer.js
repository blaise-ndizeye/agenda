import actionNames from "../actionNames"

const initialState = {
  events: [],
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionNames.GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      }
    case actionNames.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(
          (event) => event._id !== action.payload?._id
        ),
      }
    default:
      return state
  }
}

export default eventReducer
