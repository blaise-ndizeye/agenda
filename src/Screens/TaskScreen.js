import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import TaskListScreen from "./TaskListScreen"
import DoneTaskScreen from "./DoneTaskScreen"

const TaskScreen = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName="List"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName, size, color
          if (route.name === "List") {
            iconName = "list"
            color = focused ? "#0000ff" : "#999"
            size = focused ? 20 : 12
          }
          if (route.name === "Done") {
            iconName = "check-square"
            color = focused ? "#0000ff" : "#999"
            size = focused ? 20 : 12
          }

          return <FontAwesome5 name={iconName} color={color} size={size} />
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: "#fff",
        inactiveBackgroundColor: "#ecf0f1",
      }}
    >
      <Tab.Screen name="List" component={TaskListScreen} />
      <Tab.Screen name="Done" component={DoneTaskScreen} />
    </Tab.Navigator>
  )
}

export default TaskScreen
