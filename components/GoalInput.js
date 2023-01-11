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
import storage from "../storage";

function GoalInput({
  addGoalHandler,
  visible,
  setVisible,
  setCourseGoals,
  courseGoals,
}) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const { height, width } = useWindowDimensions();

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalBtnHandler() {
    addGoalHandler(enteredGoalText);
    setEnteredGoalText("");

    // 여기서 async storage와 coursegoals를 동기화
    storage.save({
      key: "todos", // Note: Do not use underscore("_") in key!
      data: {
        courseGoals: courseGoals,
      },

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null,
    });
  }

  function cancelBtnHandler() {
    setVisible(!visible);
  }

  function clearAllBtnHandler() {
    Alert.alert("delete all TODOs", "cannot be restored later", [
      {
        text: "Yes, I want",
        onPress: () => {
          setCourseGoals([]);
          setVisible(!visible);
        },
        style: "destructive",
      },
      { text: "No" },
    ]);

    // 여기서 async storage와 coursegoals를 동기화
    storage.save({
      key: "todos", // Note: Do not use underscore("_") in key!
      data: {
        courseGoals: courseGoals,
      },

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null,
    });
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
