import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import TaskScreen from "./TaskScreen"
import EventStackScreen from "./EventStackScreen"

const HomeScreen = () => {
  const Tab = createMaterialTopTabNavigator()
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
