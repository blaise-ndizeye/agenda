import React from "react"
import { Text } from "react-native"
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"

const TextWithFont = (props) => {
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../../assets/fonts/IndieFlower-Regular.ttf"),
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <Text style={{ fontFamily: "Indie-Flower", ...props.style }}>
      {props.children}
    </Text>
  )
}

export default TextWithFont
