import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import EventListScreen from "./EventListScreen"
import AddEditEventScreen from "./AddEditEventScreen"

const EventStackScreen = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="EventList"
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="EventList" component={EventListScreen} />
      <Stack.Screen name="AddEditEvent" component={AddEditEventScreen} />
    </Stack.Navigator>
  )
}

export default EventStackScreen
