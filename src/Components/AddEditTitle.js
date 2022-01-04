import React from "react"
import { StyleSheet, View } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "../utils/colors"
import TextWithFont from "./TextWithFont"

const AddEditTitle = (props) => {
  return (
    <View style={[styles.container, { ...props?.style }]}>
      <FontAwesome5 name={props.iconName} size={20} color={Colors.gray} />
      <TextWithFont style={styles.text}>{props.title}</TextWithFont>
    </View>
  )
}

export default AddEditTitle

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: Colors.gray,
  },
})
