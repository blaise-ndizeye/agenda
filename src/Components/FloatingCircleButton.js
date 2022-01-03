import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "../utils/colors"

export default function FloatingCircleButton(props) {
  return (
    <TouchableOpacity style={styles.add_task} onPress={props.onPressHandler}>
      <FontAwesome5 name="plus" color={Colors.white} size={20} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  add_task: {
    width: 55,
    height: 55,
    backgroundColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    elevation: 10,
    position: "absolute",
    bottom: 10,
    right: 8,
  },
})
