import actionNames from "../actionNames"

const initialState = {
  tasks: [],
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionNames.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      }
    case actionNames.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload?._id),
      }
    default:
      return state
  }
}

export default taskReducer
