// this file will be used later
import { useState } from "react";
import {
  CheckBox,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
// import self created stuff
import { styles } from "../App";

export default function TaskScreen({ route, navigation }) {
  const { setData, data, itemInfo } = route.params;
  let [taskName, setTaskName] = useState("");
  let [taskDesc, setTaskDesc] = useState("");

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

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {/* top bar */}
      <View style={[styles.col2, styles.topBar, { alignItems: "stretch" }]}>
        {/* back button to return to MAIN */}
        <TouchableOpacity style={styles.backBtn}>
          <Text>Why</Text>
        </TouchableOpacity>
        {/* section title */}
        <Text style={[styles.sectionTitle, { textAlign: "center", flex: 1 }]}>
          Create a New Task
        </Text>
      </View>

      <View style={styles.mainArea}>
        {/* form to create new task */}
        <Text style={styles.whiteText}>Task Name*</Text>
        <TextInput
          style={[styles.input, styles.whiteText]}
          onChangeText={(value) => setTaskName(value)}
        />
        <Text style={styles.whiteText}>Task Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.whiteText,
            { height: "", overflow: "visible" },
          ]}
          placeholder="describe the task..."
          placeholderTextColor="#767983"
          numberOfLines={4}
          multiline
          onChangeText={(value) => setTaskDesc(value)}
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
