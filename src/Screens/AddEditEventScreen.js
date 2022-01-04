import React from "react"
import { Button, Text, View } from "react-native"

const AddEditEventScreen = ({ navigation }) => {
  return (
    <View>
      <Text>AddEditEventScreen Screen</Text>
      <Button
        title="Go back to event list"
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export default AddEditEventScreen
