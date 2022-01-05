import React from "react"
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import CheckBox from "expo-checkbox"
import AntDesign from "react-native-vector-icons/AntDesign"

import { editTask, deleteTask, getTasks } from "../Redux/actions"
import FloatingCircleButton from "../Components/FloatingCircleButton"
import AddEditTitle from "../Components/AddEditTitle"
import ShowError from "../Components/ShowError"
import Colors from "../utils/colors"
import TextWithFont from "../Components/TextWithFont"
import WarningModal from "../Components/WarningModal"
import actionNames from "../Redux/actionNames"

const TaskListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")
  const [showWarning, setShowWarning] = React.useState(false)
  const [taskToDelete, setTaskToDelete] = React.useState(null)
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const data = state.task.tasks.filter((task) => task.done !== 1)

  React.useEffect(() => {
    try {
      dispatch(getTasks())
      setError(false)
      setErrorMsg("")
    } catch (err) {
      dispatch({ type: actionNames.APP_ERROR, payload: err.message })
      if (state.app.error) {
        setError(true)
        setErrorMsg(state.app.error)
      }
    }
  }, [])

  const onPressContinueDeleteHandler = () => {
    try {
      dispatch(deleteTask(taskToDelete))
      setError(false)
      setErrorMsg("")
      setShowWarning(false)
      setTaskToDelete(null)
    } catch (err) {
      dispatch({ type: actionNames.APP_ERROR, payload: err.message })
      if (state.app.error) {
        setError(true)
        setErrorMsg(state.app.error)
      }
    }
  }

  const onPressDeleteHandler = (task) => {
    setShowWarning(true)
    setTaskToDelete(task)
  }

  const onRefreshHandler = () => {
    try {
      setRefreshing(true)
      dispatch(getTasks())
      setRefreshing(false)
    } catch (err) {
      dispatch({ type: actionNames.APP_ERROR, payload: err.message })
      if (state.app.error) {
        setError(true)
        setErrorMsg(state.app.error)
      }
    }
  }

  const onChangeCheckHandler = (task) => {
    try {
      dispatch(
        editTask({
          title: task.title,
          body: task.body,
          done: task.done === 1 ? false : true,
          _id: task._id,
        })
      )
    } catch (err) {
      dispatch({ type: actionNames.APP_ERROR, payload: err.message })
      if (state.app.error) {
        setError(true)
        setErrorMsg(state.app.error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <WarningModal
        visible={showWarning}
        onRequestCLose={setShowWarning}
        title="Warning :"
        body={`Are you sure you want to delete ${
          taskToDelete?.title.length > 10
            ? `${taskToDelete?.title.substring(0, 10)}...`
            : taskToDelete?.title
        } task ?`}
        continueHandler={onPressContinueDeleteHandler}
        cancelHandler={() => setShowWarning(false)}
      />
      <AddEditTitle
        title="List of Uncompleted tasks"
        iconName="list"
        style={{ marginVertical: 10 }}
      />
      {error && <ShowError message={errorMsg} />}
      {data.length === 0 && (
        <ShowError
          message="No completed tasks added yet. Click the button below to add more"
          style={{ backgroundColor: Colors.gray }}
        />
      )}
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.task_container}>
            <View style={styles.task_checkbox}>
              <CheckBox
                value={item.done === 1 ? true : false}
                color={item.done === 1 ? Colors.blue : Colors.gray}
                onValueChange={() => onChangeCheckHandler(item)}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddEditTask", {
                  data: item,
                })
              }
              style={styles.task_touchable}
            >
              <TextWithFont style={styles.task_title}>
                {item.title.length > 10
                  ? `${item.title.substring(0, 10)}...`
                  : item.title}
              </TextWithFont>
              <TextWithFont style={styles.task_text}>
                {`${item.body.substring(0, 25)}...`}
              </TextWithFont>
              <TextWithFont style={styles.task_date}>
                Date created : {item.createdAt}
              </TextWithFont>
            </TouchableOpacity>
            <View style={styles.task_checkbox}>
              <TouchableOpacity
                onPress={() => onPressDeleteHandler(item)}
                style={styles.task_delete_btn}
              >
                <AntDesign name="delete" size={30} color={Colors.red} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshHandler}
            colors={[Colors.red, Colors.blue, Colors.error, Colors.black]}
          />
        }
      />
      <FloatingCircleButton
        onPressHandler={() => navigation.navigate("AddEditTask")}
      />
    </View>
  )
}

export default TaskListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  task_delete_btn: {
    margin: 3,
  },
  task_container: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  task_date: {
    fontSize: 13,
  },
  task_text: {
    fontSize: 15,
    color: Colors.gray,
  },
  task_title: {
    fontSize: 20,
  },
  task_touchable: {
    marginHorizontal: 15,
    flex: 1,
  },
  task_checkbox: {
    alignItems: "center",
    justifyContent: "center",
  },
})
