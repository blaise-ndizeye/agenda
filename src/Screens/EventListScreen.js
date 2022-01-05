import React from "react"
import { StyleSheet, View } from "react-native"

import AddEditTitle from "../Components/AddEditTitle"
import FLoatingCircleButton from "../Components/FloatingCircleButton"

const EventListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AddEditTitle
        title="List of all events"
        iconName="list"
        style={{ marginVertical: 10 }}
      />
      <FLoatingCircleButton
        onPressHandler={() => navigation.navigate("AddEditEvent")}
      />
    </View>
  )
}

export default EventListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
