import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

import FloatingCircleButton from "../Components/FloatingCircleButton"

const TaskListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>TaskList Screen</Text>
      <FloatingCircleButton
        onPressHandler={() => navigation.navigate("AddEditTask")}
      />
    </View>
  )
}

export default TaskListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
