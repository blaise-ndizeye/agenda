import React from "react"
import { View, Text, Button } from "react-native"

const AddEditTaskScreen = ({ navigation }) => {
  return (
    <View>
      <Text>AddEditTask Screen</Text>
      <Button title="Back to List" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default AddEditTaskScreen
