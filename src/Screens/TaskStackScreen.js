import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import TaskListScreen from "./TaskListScreen"
import AddEditTaskScreen from "./AddEditTaskScreen"

const TaskStackScreen = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName="TaskList"
      screenOptions={() => ({
        header: () => null,
      })}
    >
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="AddEditTask" component={AddEditTaskScreen} />
    </Stack.Navigator>
  )
}

export default TaskStackScreen
