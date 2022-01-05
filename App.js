import React from "react"
import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"

import store from "./src/Redux"
import Colors from "./src/utils/colors"
import FirstStackScreen from "./src/Screens/FirstStackScreen"

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.light} />
        <FirstStackScreen />
      </NavigationContainer>
    </Provider>
  )
}
