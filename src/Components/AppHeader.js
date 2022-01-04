import React from "react"
import { StyleSheet, View } from "react-native"

import TextWithFont from "./TextWithFont"
import Colors from "../utils/colors"

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <TextWithFont style={styles.text}>Easy Agenda</TextWithFont>
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: Colors.blue,
  },
})
