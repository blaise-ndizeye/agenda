import db from "../utils/db"
import actionNames from "./actionNames"

export const createtables = () => (dispatch) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS Events (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        createdAt TEXT,
        updatedAt TEXT,
        body TEXT,
        weather TEXT
      )`)
      tx.executeSql(`CREATE TABLE IF NOT EXISTS Tasks (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        createdAt TEXT,
        updatedAt TEXT,
        body TEXT,
        done INTEGER
      )`)
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}

export const getTasks = () => (dispatch) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Tasks`, [], (tx, results) => {
        let tasks = []
        for (let i = 0; i < results.rows.length; i++) {
          console.log(results.rows.item(i))
          tasks.push(results.rows.item(i))
        }
        dispatch({
          type: actionNames.GET_TASKS,
          payload: tasks,
        })
      })
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}

export const getEvents = () => (dispatch) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Events`, [], (tx, results) => {
        dispatch({
          type: actionNames.GET_EVENTS,
          payload: results.rows,
        })
      })
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}

export const deleteTask = (task) => (dispatch) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM Tasks WHERE _id = ? AND title = ?`,
        [task?._id, task?.title],
        (tx, results) => {
          dispatch({
            type: actionNames.DELETE_TASK,
            payload: task,
          })
          dispatch(getTasks())
        }
      )
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}

export const deleteEvent = (event) => (dispatch) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM Events WHERE _id = ? AND title = ?`,
        [event?._id, event?.title],
        (tx, results) => {
          dispatch({
            type: actionNames.DELETE_EVENT,
            payload: event,
          })
          dispatch(getEvents())
        }
      )
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}

export const editTask = (task) => (dispatch) => {
  try {
    let date = new Date()
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE Tasks SET title = ?, body = ?, updatedAt =?, done = ? WHERE _id = ?`,
        [task?.title, task?.body, date.toDateString(), task?.done, task?._id],
        (tx, results) => {
          dispatch(getTasks())
        }
      )
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}

export const editEvent = (event) => (dispatch) => {
  try {
    let date = new Date()
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE Events SET title = ?, body = ?, updatedAt = ?, weather = ? WHERE _id = ?`,
        [
          event?.title,
          event?.body,
          date.toDateString(),
          event?.weather,
          event?._id,
        ],
        (tx, results) => {
          dispatch(getTasks())
        }
      )
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}

export const addEvent = (event) => (dispatch) => {
  try {
    let date = new Date()
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Tasks (title, createdAt, updatedAt, body, weather) VALUES ( ?, ?, ?, ?, ?)`,
        [
          event?.title,
          date.toDateString(),
          date.toDateString(),
          event?.body,
          event?.weather,
        ],
        (tx, results) => {
          dispatch(getTasks())
        }
      )
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}

export const addTask = (task) => (dispatch) => {
  try {
    let date = new Date()
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Tasks (title, createdAt, updatedAt, body, done) VALUES ( ?, ?, ?, ?, ?)`,
        [
          task?.title,
          date.toDateString(),
          date.toDateString(),
          task?.body,
          task?.done,
        ],
        (tx, results) => {
          dispatch(getTasks())
        }
      )
    })
    dispatch({ type: actionNames.REMOVE_APP_ERROR })
  } catch (err) {
    dispatch({
      type: actionNames.APP_ERROR,
      payload: err.message,
    })
    console.error(err)
  }
}
