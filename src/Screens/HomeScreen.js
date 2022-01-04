import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useDispatch, useSelector } from "react-redux"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Alert } from "react-native"
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"

import TaskScreen from "./TaskScreen"
import EventStackScreen from "./EventStackScreen"
import { createtables } from "../Redux/actions"
import Colors from "../utils/colors"
import AppHeader from "../Components/AppHeader"

const HomeScreen = () => {
  const Tab = createMaterialTopTabNavigator()
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app)
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../../assets/fonts/IndieFlower-Regular.ttf"),
  })

  React.useEffect(() => {
    try {
      dispatch(createtables())
    } catch (err) {
      if (app.error) Alert.alert("App Error!", app.error, [{ text: "OK" }])
    }
  }, [])

  if (!fontsLoaded) return <AppLoading />

  return (
    <>
      <AppHeader />
      <Tab.Navigator
        initialRouteName="Tasks"
        tabBarOptions={{
          showIcon: true,
          showLabel: true,
          activeTintColor: Colors.blue,
          inactiveTintColor: Colors.gray,
          labelStyle: {
            fontFamily: "Indie-Flower",
          },
        }}
      >
        <Tab.Screen
          name="Tasks"
          component={TaskScreen}
          options={() => ({
            tabBarLabel: "Tasks",
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome5
                  name="tasks"
                  size={focused ? 25 : 20}
                  color={focused ? Colors.blue : Colors.gray}
                />
              )
            },
          })}
        />
        <Tab.Screen
          name="Events"
          component={EventStackScreen}
          options={({ route }) => ({
            tabBarLabel: "Events",
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialIcons
                  name="event"
                  size={focused ? 25 : 20}
                  color={focused ? Colors.blue : Colors.gray}
                />
              )
            },
          })}
        />
      </Tab.Navigator>
    </>
  )
}

export default HomeScreen
