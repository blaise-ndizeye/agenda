import React from "react"
import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"

import HomeScreen from "./src/Screens/HomeScreen"
import store from "./src/Redux"

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <HomeScreen />
      </NavigationContainer>
    </Provider>
  )
}
