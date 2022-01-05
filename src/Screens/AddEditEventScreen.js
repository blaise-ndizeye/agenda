import React from "react"
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"
import { useDispatch, useSelector } from "react-redux"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { addEvent, editEvent } from "../Redux/actions"
import AddEditTitle from "../Components/AddEditTitle"
import Colors from "../utils/colors"
import globalStyles from "../utils/globalStyles"
import CustomButton from "../Components/CustomButton"
import ShowError from "../Components/ShowError"
import TextWithFont from "../Components/TextWithFont"
import actionNames from "../Redux/actionNames"

const AddEditEventScreen = ({ navigation, route }) => {
  const [eventId, setEventId] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [weather, setWeather] = React.useState("Hot")
  const [error, setError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [weatherEvents] = React.useState([
    { name: "Cold", iconName: "weather-snowy" },
    { name: "Hot", iconName: "weather-sunny" },
    { name: "Cloudy", iconName: "weather-cloudy" },
    { name: "Rainy", iconName: "weather-rainy" },
  ])

  React.useEffect(() => {
    if (route.params?.data) {
      const data = route.params?.data
      setTaskId(data._id)
      setTitle(data.title)
      setBody(data.body)
      setWeather(data.weather)
    }
  }, [route.params])

  const onSubmitHandler = () => {
    try {
      if (!title || !body || !weather) {
        setError(true)
        return setErrorMsg("Please provide valid data in the input fields")
      }
      if (route.params?.data) {
        dispatch(editEvent({ title, body, weather, _id: eventId }))
      } else {
        dispatch(addEvent({ title, body, weather }))
      }
      setError(false)
      setErrorMsg("")
      navigation.navigate("EventList")
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
        title={route.params?.data ? "Edit event" : "Add event"}
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
      <View style={styles.weather_container}>
        <TextWithFont style={styles.text}>Select weather :</TextWithFont>
        <View style={styles.weather_icons_container}>
          {weatherEvents.map((weatherEvent) => (
            <TouchableOpacity
              key={weatherEvent.name}
              style={[
                styles.weather_icon,
                weatherEvent.name === weather && {
                  backgroundColor: Colors.blue,
                  borderRadius: 3,
                },
              ]}
              onPress={() => setWeather(weatherEvent.name)}
            >
              <MaterialCommunityIcons
                name={weatherEvent.iconName}
                size={20}
                color={
                  weatherEvent.name === weather ? Colors.white : Colors.gray
                }
              />
              <TextWithFont
                style={
                  weatherEvent.name === weather
                    ? {
                        color: Colors.white,
                      }
                    : { color: Colors.gray }
                }
              >
                {weatherEvent.name}
              </TextWithFont>
            </TouchableOpacity>
          ))}
        </View>
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

export default AddEditEventScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  weather_container: {
    marginVertical: 20,
  },
  weather_icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  weather_icons_container: {
    flexDirection: "row",
    alignItems: "center",
  },
})
