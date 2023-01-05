import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Modal,
  useWindowDimensions,
  Alert,
  Image,
} from "react-native";
import Colors from "./Colors";

function GoalInput({ addGoalHandler, visible, setVisible, setCourseGoals }) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const { height, width } = useWindowDimensions();

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalBtnHandler() {
    addGoalHandler(enteredGoalText);
    setEnteredGoalText("");
  }

  function cancelBtnHandler() {
    setVisible(!visible);
  }

  function clearAllBtnHandler() {
    Alert.alert("Todo를 모두 지웁니다", "복구되지 않습니다", [
      {
        text: "네",
        onPress: () => {
          setCourseGoals([]);
          setVisible(!visible);
        },
        style: "destructive",
      },
      { text: "아니요" },
    ]);
  }

  return (
    <Modal visible={visible} animationType="slide" style={styles.modal}>
      <View style={styles.Container}>
        <View style={styles.firstContainer}>
          <Image
            source={require("../assets/TodoIcon.gif")}
            style={styles.image}
          />
          <TextInput
            placeholder="Your Course goal"
            style={[styles.textInput, { width: width - 30 }]}
            onChangeText={goalInputHandler}
            value={enteredGoalText}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Add Todo"
                onPress={addGoalBtnHandler}
                color={Colors.ComponentColor.btnColor}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Cancel"
                color={Colors.ComponentColor.btnCancel}
                onPress={cancelBtnHandler}
              />
            </View>
          </View>
        </View>

        <View style={styles.secondContainer}>
          <View style={styles.button}>
            <Button
              title="Clear All"
              color={Colors.ComponentColor.btnCancel}
              onPress={clearAllBtnHandler}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  firstContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  secondContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 20,
    borderRadius: 10,
  },

  //imageContainer
  image: {
    width: 130,
    height: 130,
    marginBottom: 30,
  },
});
