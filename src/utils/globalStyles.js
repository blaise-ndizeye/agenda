import { StatusBar, StyleSheet } from "react-native"

const globalStyles = StyleSheet.create({
  safeArea: {
    marginTop: StatusBar.currentHeight,
  },
})

export default globalStyles
