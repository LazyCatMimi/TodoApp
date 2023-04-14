// this file will be used later
import { useState } from "react";
import {
  CheckBox,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
// import self created stuff
import { styles } from "../App";
import { Input } from "react-native-elements";

export default function TaskScreen({ route, navigation }) {
  const { setData, data, itemInfo, type } = route.params;
  let [taskName, setTaskName] = useState("");
  let [taskDesc, setTaskDesc] = useState("");
  let [taskDate, setTaskDate] = useState("");
  let [err, setErr] = useState("");

  const addNewTask = () => {
    if (taskName.length > 0) {
      const newTask = {
        title: taskName,
        description: taskDesc,
        date: "",
        completed: false,
        key: `t${data.length + 1}`,
      };
      setData([...data, newTask]);
    }
    navigation.navigate("Home");
  };

  const validateDate = () => {
    const regex = /^\d{2}\/\d{2}\/\d{2}$/;
    if (taskDate.length === 0) {
      setErr("");
    } else if (!regex.test(taskDate)) {
      setErr("Please Match the format mm/dd/yy");
    } else if (!isNaN(new Date(taskDate))) {
      setErr(`${taskDate} is not a valid date.`);
    } else {
      setErr("");
    }
  };
  return (
    <View style={[styles.container, { flex: 1 }]}>
      {/* top bar */}
      <View style={[styles.col2, styles.topBar, { alignItems: "stretch" }]}>
        {/* back button to return to MAIN */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text>Why</Text>
        </TouchableOpacity>
        {/* section title */}
        <Text style={[styles.sectionTitle, { textAlign: "center", flex: 1 }]}>
          {type === "NEW" ? "Create a New Task" : "Edit Task"}
        </Text>
      </View>

      <View style={styles.mainArea}>
        {/* form to create new task */}
        {/* task name */}
        <Input
          label="Task Name*"
          inputContainerStyle={[styles.input, styles.whiteText]}
          inputStyle={{ color: "white" }}
          onChangeText={(value) => setTaskName(value)}
        />
        {/* task description */}
        <Input
          label="Task Description"
          inputContainerStyle={[
            styles.input,
            styles.whiteText,
            { height: "", overflow: "visible" },
          ]}
          inputStyle={{ color: "white" }}
          placeholder="describe the task..."
          placeholderTextColor="#767983"
          numberOfLines={4}
          multiline
          onChangeText={(value) => setTaskDesc(value)}
        />
        {/* task deadline */}
        <Input
          label="Task Deadline"
          inputContainerStyle={[styles.input, styles.whiteText]}
          inputStyle={{ color: "white" }}
          placeholder="mm/dd/yy"
          placeholderTextColor="#767983"
          onChangeText={(value) => setTaskDate(value)}
          onBlur={validateDate}
          errorMessage={err}
        />
        {/* submit button, only enables if task name contains something */}
        <TouchableOpacity
          style={[
            styles.newTaskBtn,
            taskName.length == 0 ? { opacity: "20%" } : "",
          ]}
          onPress={addNewTask}
          disabled={taskName.length == 0 ? true : false}
        >
          <Text style={[styles.whiteText, styles.btnText]}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
