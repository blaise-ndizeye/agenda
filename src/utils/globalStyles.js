import { StatusBar, StyleSheet } from "react-native"
import Colors from "./colors"

const globalStyles = StyleSheet.create({
  safeArea: {
    marginTop: StatusBar.currentHeight,
  },
  text_input: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.blue,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 20,
    color: Colors.gray,
  },
})

export default globalStyles
