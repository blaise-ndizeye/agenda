import React from "react"
import { ScrollView, StyleSheet, TextInput, View } from "react-native"
import CheckBox from "expo-checkbox"
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"
import { useDispatch, useSelector } from "react-redux"

import { addTask, editTask } from "../Redux/actions"
import AddEditTitle from "../Components/AddEditTitle"
import Colors from "../utils/colors"
import globalStyles from "../utils/globalStyles"
import CustomButton from "../Components/CustomButton"
import ShowError from "../Components/ShowError"
import TextWithFont from "../Components/TextWithFont"
import actionNames from "../Redux/actionNames"

const AddEditTaskScreen = ({ navigation, route }) => {
  const [taskId, setTaskId] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [done, setDone] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (route.params?.data) {
      const data = route.params?.data
      setTaskId(data._id)
      setTitle(data.title)
      setBody(data.body)
      setDone(data.done === 1 ? true : false)
    }
  }, [route.params])

  const onSubmitHandler = () => {
    try {
      if (!title || !body) {
        setError(true)
        return setErrorMsg("Please provide valid data in the input fields")
      }
      if (route.params?.data) {
        dispatch(editTask({ title, body, done, _id: taskId }))
      } else {
        dispatch(addTask({ title, body, done }))
      }
      setError(false)
      setErrorMsg("")
      navigation.navigate("TaskList")
    } catch (err) {
      dispatch({ type: actionNames.APP_ERROR, payload: err.message })
      if (state.app.error) {
        setError(true)
        setErrorMsg(state.app.error)
      }
    }
  }

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../../assets/fonts/IndieFlower-Regular.ttf"),
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <ScrollView style={styles.container}>
      <AddEditTitle
        title={route.params?.data ? "Edit task" : "Add task"}
        iconName={route.params?.data ? "edit" : "plus"}
        style={{ marginVertical: 10 }}
      />
      {error && <ShowError message={errorMsg} />}
      <TextInput
        value={title}
        placeholder="Write the title..."
        onChangeText={(value) => setTitle(value)}
        style={[globalStyles.text_input, { fontFamily: "Indie-Flower" }]}
      />
      <TextInput
        numberOfLines={4}
        multiline
        value={body}
        placeholder="Write the body..."
        onChangeText={(value) => setBody(value)}
        style={[globalStyles.text_input, { fontFamily: "Indie-Flower" }]}
      />
      <View style={styles.check_container}>
        <CheckBox
          value={done}
          onValueChange={setDone}
          color={done ? Colors.blue : Colors.gray}
        />
        <TextWithFont style={styles.text}>Already completed</TextWithFont>
      </View>
      <CustomButton
        onPressHandler={onSubmitHandler}
        title="Save"
        iconName="save"
      />
      <CustomButton
        onPressHandler={() => navigation.goBack()}
        title="Back to list"
        iconName="arrow-left"
        style={{ backgroundColor: Colors.gray }}
      />
    </ScrollView>
  )
}

export default AddEditTaskScreen

const styles = StyleSheet.create({
  check_container: {
    flexDirection: "row",
    marginVertical: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
  },
})
