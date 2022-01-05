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
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { deleteEvent, getEvents } from "../Redux/actions"
import FloatingCircleButton from "../Components/FloatingCircleButton"
import AddEditTitle from "../Components/AddEditTitle"
import ShowError from "../Components/ShowError"
import Colors from "../utils/colors"
import TextWithFont from "../Components/TextWithFont"
import actionNames from "../Redux/actionNames"

const EventListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const data = state.event.events

  React.useEffect(() => {
    try {
      dispatch(getEvents())
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

  const onPressDeleteHandler = (event) => {
    try {
      Alert.alert(
        "WARNING",
        `Are you sure you want to delete ${event.title} event?`,
        [
          { text: "Continue", onPress: () => dispatch(deleteEvent(event)) },
          { text: "Cancel" },
        ],
        { cancelable: true }
      )
      setError(false)
      setErrorMsg("")
    } catch (err) {
      dispatch({ type: actionNames.APP_ERROR, payload: err.message })
      if (state.app.error) {
        setError(true)
        setErrorMsg(state.app.error)
      }
    }
  }

  const onRefreshHandler = () => {
    try {
      setRefreshing(true)
      dispatch(getEvents())
      setRefreshing(false)
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
      <AddEditTitle
        title="List of all events"
        iconName="list"
        style={{ marginVertical: 10 }}
      />
      {error && <ShowError message={errorMsg} />}
      {data.length === 0 && (
        <ShowError
          message="No events added yet. Click the button below to add more"
          style={{ backgroundColor: Colors.gray }}
        />
      )}
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.event_container}>
            <View style={styles.event_weather}>
              <MaterialCommunityIcons
                name={
                  item.weather === "Cold"
                    ? "weather-snowy"
                    : item.weather === "Hot"
                    ? "weather-sunny"
                    : item.weather === "Cloudy"
                    ? "weather-cloudy"
                    : "weather-rainy"
                }
                size={20}
                color={Colors.gray}
              />
              <TextWithFont style={{ color: Colors.gray }}>
                {item.weather}
              </TextWithFont>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddEditEvent", {
                  data: item,
                })
              }
              style={styles.event_touchable}
            >
              <TextWithFont style={styles.event_title}>
                {item.title.length > 15
                  ? `${item.title.substring(0, 15)}...`
                  : item.title}
              </TextWithFont>
              <TextWithFont style={styles.event_text}>
                {`${item.body.substring(0, 25)}...`}
              </TextWithFont>
              <TextWithFont style={styles.task_date}>
                Date created : {item.createdAt}
              </TextWithFont>
            </TouchableOpacity>
            <View style={styles.event_weather}>
              <TouchableOpacity
                onPress={() => onPressDeleteHandler(item)}
                style={styles.event_delete_btn}
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
        onPressHandler={() => navigation.navigate("AddEditEvent")}
      />
    </View>
  )
}

export default EventListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  event_delete_btn: {
    margin: 3,
  },
  event_container: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  event_date: {
    fontSize: 13,
  },
  event_text: {
    fontSize: 15,
    color: Colors.gray,
  },
  event_title: {
    fontSize: 20,
  },
  event_touchable: {
    marginHorizontal: 15,
    flex: 1,
  },
  event_weather: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  weather_container: {
    marginVertical: 20,
  },
  weather_icons_container: {
    flexDirection: "row",
    alignItems: "center",
  },
})
