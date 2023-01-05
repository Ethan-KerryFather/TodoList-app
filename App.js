import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import Colors from "./components/Colors";

function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(!modalIsVisible);
  }

  function addGoalHandler(enteredText) {
    if (enteredText === "") alert(`할 일이 입력되지 않았습니다`);
    else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredText, id: Math.random().toString() },
      ]);
      setModalIsVisible(!modalIsVisible);
    }
  }

  function deleteGoalHandler(id) {
    console.log("DELETE");
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((element) => element.id !== id);
    });
  }
  return (
    <View style={styles.appContainer}>
      <StatusBar style="dark" />
      <Button
        title="Add TodoList"
        color={Colors.ComponentColor.btnColor}
        onPress={startAddGoalHandler}
      />
      {modalIsVisible && (
        <GoalInput
          addGoalHandler={addGoalHandler}
          visible={modalIsVisible}
          setVisible={setModalIsVisible}
          setCourseGoals={setCourseGoals}
        />
      )}
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => (
            <GoalItem
              text={itemData.item.text}
              index={itemData.index}
              onDeleteItem={deleteGoalHandler}
              id={itemData.item.id}
            />
          )}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  // inline styles 를 할 수도
  appContainer: {
    paddingTop: 80,
    paddingLeft: 16,
    paddingRight: 16,

    flex: 1,
  },

  goalsContainer: {
    flex: 6,
    flexDirection: "column",
    alignItems: "stretch",
  },
});
