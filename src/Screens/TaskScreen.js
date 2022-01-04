import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"

import DoneTaskScreen from "./DoneTaskScreen"
import Colors from "../utils/colors"
import TaskStackScreen from "./TaskStackScreen"

const TaskScreen = () => {
  const Tab = createBottomTabNavigator()
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../../assets/fonts/IndieFlower-Regular.ttf"),
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <Tab.Navigator
      initialRouteName="ListStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName, size, color
          if (route.name === "ListStack") {
            iconName = "list"
            color = focused ? Colors.blue : Colors.gray
            size = focused ? 20 : 12
          }
          if (route.name === "Done") {
            iconName = "check-square"
            color = focused ? Colors.blue : Colors.gray
            size = focused ? 20 : 12
          }

          return <FontAwesome5 name={iconName} color={color} size={size} />
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: Colors.white,
        inactiveBackgroundColor: Colors.light,
        labelStyle: {
          fontSize: 12,
          fontFamily: "Indie-Flower",
        },
      }}
    >
      <Tab.Screen
        name="ListStack"
        options={{ tabBarLabel: "Uncompleted" }}
        component={TaskStackScreen}
      />
      <Tab.Screen
        name="Done"
        options={{ tabBarLabel: "Completed" }}
        component={DoneTaskScreen}
      />
    </Tab.Navigator>
  )
}

export default TaskScreen
