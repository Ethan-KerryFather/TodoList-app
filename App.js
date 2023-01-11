import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import Colors from "./components/Colors";
import storage from "./storage";

function App() {
  const [courseGoals, setCourseGoals] = useState([
    { text: "press 1sec to remove TODO", id: "00" },
  ]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  /*
  TODO:
  흐름을 보자.
  1. 앱이 로딩되면 일단 다 불러와야해.
  useEffect(()=>{},[])
    없으면? 
      처음에 업로드 먼저. 성능은 여기서 별로 안중요. 
      store에 isUpdated? 에 true 체크되어있으면 실행 ㄴㄴ 아니면 빈배열 업로드.
  2. 앱이 종료될때 기존의 todo state를 동기화시켜야해.
  App.js가 unmount될때

  이게 전부
  */

  useEffect(() => {
    // mount

    storage
      .load({
        key: "todos",

        // autoSync (default: true) means if data is not found or has expired,
        // then invoke the corresponding sync method
        autoSync: true,

        // syncInBackground (default: true) means if data expired,
        // return the outdated data first while invoking the sync method.
        // If syncInBackground is set to false, and there is expired data,
        // it will wait for the new data and return only after the sync completed.
        // (This, of course, is slower)
        syncInBackground: true,

        // you can pass extra params to the sync method
        // see sync example below
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true,
        },
      })
      .then((ret) => {
        // found data go to then()
        console.log(ret.courseGoals);
      })
      .catch((err) => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            break;
          case "ExpiredError":
            // TODO
            break;
        }
      });
    return () => {
      // unmount
      console.log("unmount");
      storage.save({
        key: "todos", // Note: Do not use underscore("_") in key!
        data: {
          courseGoals: courseGoals,
        },

        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600,
      });
    };
  }, []);

  function startAddGoalHandler() {
    setModalIsVisible(!modalIsVisible);
  }

  function addGoalHandler(enteredText) {
    if (enteredText === "") alert(`there's no TODO input`);
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
    marginTop: 25,
  },
});
