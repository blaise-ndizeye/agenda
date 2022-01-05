import React from "react"
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"

import Colors from "../utils/colors"
import TextWithFont from "../Components/TextWithFont"

const WarningModal = (props) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.container}>
        <View style={styles.warning_container}>
          <View style={styles.warning_title_container}>
            <AntDesign name="warning" size={30} color={Colors.error} />
            <TextWithFont style={styles.title}>{props.title}</TextWithFont>
          </View>
          <View style={styles.warning_body_container}>
            <TextWithFont style={styles.body}>{props.body}</TextWithFont>
          </View>
          <View style={styles.warning_actions_container}>
            <TouchableOpacity
              onPress={props.continueHandler}
              style={[
                styles.warning_actions_btn,
                {
                  marginRight: 5,
                },
              ]}
            >
              <TextWithFont style={styles.warning_actions_continue_btn_txt}>
                Continue
              </TextWithFont>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.cancelHandler}
              style={[
                styles.warning_actions_btn,
                {
                  marginLeft: 5,
                },
              ]}
            >
              <TextWithFont style={styles.warning_actions_cancel_btn_txt}>
                Cancel
              </TextWithFont>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default WarningModal

const styles = StyleSheet.create({
  body: {
    color: Colors.gray,
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    color: Colors.error,
    fontSize: 30,
    marginHorizontal: 10,
  },
  warning_actions_btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  warning_actions_cancel_btn_txt: {
    fontSize: 25,
    color: Colors.blue,
  },
  warning_actions_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  warning_actions_continue_btn_txt: {
    fontSize: 25,
    color: Colors.error,
  },
  warning_container: {
    backgroundColor: Colors.light,
    padding: 10,
    borderRadius: 3,
    width: "100%",
    marginHorizontal: 10,
  },
  warning_body_container: {
    backgroundColor: Colors.white,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  warning_title_container: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})
