import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import HomeScreen from "./HomeScreen"
import IntroScreen from "./IntroScreen"

const FirstStackScreen = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={() => ({
        header: () => null,
      })}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="App" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default FirstStackScreen
