import React from "react"
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import CheckBox from "expo-checkbox"
import AntDesign from "react-native-vector-icons/AntDesign"

import { getTasks } from "../Redux/actions"
import FloatingCircleButton from "../Components/FloatingCircleButton"
import AddEditTitle from "../Components/AddEditTitle"
import ShowError from "../Components/ShowError"
import Colors from "../utils/colors"
import TextWithFont from "../Components/TextWithFont"

const TaskListScreen = ({ navigation }) => {
  const [error, setError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

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

  return (
    <View style={styles.container}>
      <AddEditTitle
        title="List of tasks"
        iconName="list"
        style={{ marginVertical: 10 }}
      />
      {error && <ShowError message={errorMsg} />}
      {state.task.tasks.length === 0 && (
        <ShowError
          message="No taks added yet. Click the button below to add more"
          style={{ backgroundColor: Colors.gray }}
        />
      )}
      <FlatList
        data={state.task.tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.task_container}>
            <View style={styles.task_checkbox}>
              <CheckBox
                value={item.done === 1 ? true : false}
                color={item.done === 1 ? Colors.blue : Colors.gray}
              />
            </View>
            <TouchableOpacity style={styles.task_touchable}>
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
            <View>
              <TouchableOpacity style={styles.task_action_btn}>
                <AntDesign name="delete" size={30} color={Colors.red} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.task_action_btn}>
                <AntDesign name="edit" size={25} color={Colors.blue} />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  task_action_btn: {
    backgroundColor: Colors.light,
    borderRadius: 5,
    margin: 3,
  },
  task_container: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
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
