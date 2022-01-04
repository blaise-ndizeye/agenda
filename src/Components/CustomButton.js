import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import TextWithFont from "./TextWithFont"
import Colors from "../utils/colors"

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPressHandler}
      style={[styles.container, { ...props?.style }]}
    >
      <FontAwesome5 name={props.iconName} color={Colors.white} size={20} />
      <TextWithFont style={styles.text}>{props.title}</TextWithFont>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.blue,
    marginBottom: 10,
    borderRadius: 3,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: Colors.white,
    marginHorizontal: 10,
  },
})
