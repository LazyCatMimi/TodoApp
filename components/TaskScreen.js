// this file will be used later
import { useState, useEffect } from "react";
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
import { IoIosArrowBack } from "react-icons/io";
import PopUp from "./popUpBox";

export default function TaskScreen({ route, navigation }) {
  const { setData, data, itemInfo, type } = route.params;
  let [taskName, setTaskName] = useState(type === "EDIT" ? itemInfo.title : "");
  let [taskDesc, setTaskDesc] = useState(
    type === "EDIT" ? itemInfo.description : ""
  );
  let [taskDate, setTaskDate] = useState(type === "EDIT" ? itemInfo.date : "");
  let [disableSubmit, setDisableSubmit] = useState(true);
  let [err, setErr] = useState("");
  let [showConfirmation, setShowConfirmation] = useState(false);

  const generateKey = () => {
    let highest = 0;
    data.forEach((item) => {
      const keyId = parseInt(item.key.slice(1));
      if (keyId > highest) {
        highest = keyId;
      }
    });
    return `t${highest + 1}`;
  };

  const addNewTask = () => {
    if (taskName.length > 0) {
      const newTask = {
        title: taskName,
        description: taskDesc,
        date: taskDate,
        completed: false,
        key: generateKey(),
      };
      setData([...data, newTask]);
    }
    navigation.navigate("Home");
  };
  const removeTask = () => {
    const updatedData = data.filter((item) => item.key !== itemInfo.key);
    setData(updatedData);
    navigation.navigate("Home");
  };

  const validateDate = () => {
    const regex = /^\d{2}\/\d{2}\/\d{2}$/;
    if (taskDate.length === 0) {
      setErr("");
    } else if (!regex.test(taskDate)) {
      setErr("Please Match the format mm/dd/yy");
    } else if (isNaN(Date.parse(taskDate))) {
      setErr(`${taskDate} is not a valid date.`);
    } else {
      if (disableSubmit) {
        setDisableSubmit(false);
      }
      setErr("");
    }
  };

  useEffect(() => {
    if (!err && taskName.length > 0) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [err, taskName]);
  return (
    <>
      {showConfirmation && (
        <PopUp
          actionFunction={removeTask}
          setShowConfirmation={setShowConfirmation}
          message="Delete this task?"
          confirmButtonColor="#D86B6B"
        />
      )}
      <View style={[styles.container, { flex: 1 }]}>
        {/* top bar */}
        <View style={[styles.col2, styles.topBar, { alignItems: "stretch" }]}>
          {/* back button to return to HOME */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <IoIosArrowBack size={30} />
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
            value={taskName}
            inputContainerStyle={[styles.input, styles.whiteText]}
            inputStyle={{ color: "white" }}
            onChangeText={(value) => setTaskName(value)}
          />
          {/* task description */}
          <Input
            label="Task Description"
            value={taskDesc}
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
            value={taskDate}
            inputContainerStyle={[styles.input, styles.whiteText]}
            inputStyle={{ color: "white" }}
            placeholder="mm/dd/yy"
            placeholderTextColor="#767983"
            onChangeText={(value) => setTaskDate(value)}
            onBlur={validateDate}
            onFocus={() => setDisableSubmit(true)}
            errorMessage={err}
          />
          {/* submit button, only enables if task name contains something && date is valid */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[
                styles.actionBtn,
                disableSubmit && { opacity: "20%" },
                {
                  backgroundColor: "#28B985",
                },
              ]}
              onPress={addNewTask}
              disabled={disableSubmit}
            >
              <Text style={[styles.whiteText, styles.btnText]}>
                {type === "NEW" ? "Create" : "Save"}
              </Text>
            </TouchableOpacity>
            {type === "EDIT" && (
              <TouchableOpacity
                style={[styles.actionBtn]}
                onPress={() => setShowConfirmation(true)}
                disabled={disableSubmit}
              >
                <Text
                  style={[styles.btnText, { color: "#D86B6B", marginTop: 20 }]}
                >
                  Delete Task
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
