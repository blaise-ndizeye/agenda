import React from "react"
import { StyleSheet, View } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"

import TextWithFont from "./TextWithFont"
import Colors from "../utils/colors"

const ShowError = (props) => {
  return (
    <View style={[styles.container, { ...props?.style }]}>
      <AntDesign name="warning" size={20} color={Colors.black} />
      <TextWithFont style={styles.text}>{props.message}</TextWithFont>
    </View>
  )
}

export default ShowError

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
  text: {
    fontSize: 15,
    marginHorizontal: 10,
  },
})
