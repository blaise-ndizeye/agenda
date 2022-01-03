import { StatusBar, StyleSheet, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"

import HomeScreen from "./src/Screens/HomeScreen"

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <HomeScreen />
    </NavigationContainer>
  )
}
