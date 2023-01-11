import storage from "./storage";

export function loadTodos(props, setStorageGoals) {
  console.log(`key: ${JSON.stringify(props)}`);
  storage
    .load({
      key: props,
    })
    .then((ret) => {
      todos = ret.courseGoals;
      setStorageGoals(todos);
    })
    .catch((err) => {
      console.warn(err.message);
    });
}
