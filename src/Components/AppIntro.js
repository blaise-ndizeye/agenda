import React from "react"
import { Image, StyleSheet, View } from "react-native"

import Colors from "../utils/colors"
import TextWithFont from "./TextWithFont"

const AppIntro = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/app_image.png")}
        style={styles.image}
      />
      <TextWithFont style={styles.text}>Agenda</TextWithFont>
    </View>
  )
}

export default AppIntro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    color: Colors.blue,
    fontSize: 30,
    padding: 10,
  },
})
