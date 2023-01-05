import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "./Colors";

function GoalItem(props) {
  console.log(`rendered : ${props.text}`);

  return (
    <View
      style={[
        styles.courseGoals,
        props.index % 2 === 0 && {
          backgroundColor: Colors.ComponentColor.btnColorTrans,
        },
      ]}
    >
      <Pressable
        onLongPress={props.onDeleteItem.bind(this, props.id)}
        android_ripple={{ color: Colors.ComponentColor.androidRippleColor }}
        style={(pressData) => {
          return pressData.onLongPress && styles.pressedItem;
        }}
      >
        <Text style={styles.courseGoalsText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  courseGoals: {
    borderRadius: 3,
  },
  pressedItem: {
    opacity: 0.5,
  },
  courseGoalsText: {
    fontSize: 15,
    padding: 16,
    color: Colors.ComponentColor.textColor,
  },
});
