import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import TaskListScreen from "./TaskListScreen"
import AddEditTaskScreen from "./AddEditTaskScreen"

const TaskStackScreen = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={() => ({
        header: () => null,
      })}
    >
      <Stack.Screen name="List" component={TaskListScreen} />
      <Stack.Screen name="AddEdit" component={AddEditTaskScreen} />
    </Stack.Navigator>
  )
}

export default TaskStackScreen
