import React from "react"

import AppIntro from "../Components/AppIntro"

const IntroScreen = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace("App")
    }, 5000)
  }, [])

  return <AppIntro />
}

export default IntroScreen
