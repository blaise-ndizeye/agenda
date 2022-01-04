import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useDispatch, useSelector } from "react-redux"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Alert } from "react-native"

import TaskScreen from "./TaskScreen"
import EventStackScreen from "./EventStackScreen"
import { createtables } from "../Redux/actions"

const HomeScreen = () => {
  const Tab = createMaterialTopTabNavigator()
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app)

  React.useEffect(() => {
    try {
      dispatch(createtables())
    } catch (err) {
      if (app.error) Alert.alert("App Error!", app.error, [{ text: "OK" }])
    }
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: "#0000ff",
        inactiveTintColor: "grey",
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
                color={focused ? "#0000ff" : "grey"}
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
                color={focused ? "#0000ff" : "grey"}
              />
            )
          },
        })}
      />
    </Tab.Navigator>
  )
}

export default HomeScreen
