import React from "react"
import { StyleSheet, View, Text } from "react-native"

import FLoatingCircleButton from "../Components/FloatingCircleButton"

const EventListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Event Screen</Text>
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
