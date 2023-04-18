// this file will be used later
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
// import self created stuff
import { styles } from "../App";
import { Input } from "react-native-elements";
import { IoIosArrowBack } from "react-icons/io";
import { BsCalendar } from "react-icons/bs";
import PopUp from "./popUpBox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskScreen({ route, navigation }) {
  const { data, itemInfo, type, user } = route.params;
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

  const addNewTask = async () => {
    const newTask = {
      title: taskName,
      description: taskDesc,
      date: taskDate,
      completed: false,
      key: generateKey(),
    };
    try {
      const userCpy = { ...user, tasks: [...data, newTask] };
      await AsyncStorage.setItem("@user", JSON.stringify(userCpy));
    } catch (err) {
      console.error(err);
    }
    navigation.navigate("Home");
  };
  const removeTask = async () => {
    const updatedData = data.filter((item) => item.key !== itemInfo.key);
    try {
      const userCpy = { ...user, tasks: updatedData };
      await AsyncStorage.setItem("@user", JSON.stringify(userCpy));
    } catch (err) {
      console.error(err);
    }
    navigation.navigate("Home");
  };
  const updateTask = async () => {
    const index = data.findIndex((item) => item.key === itemInfo.key);
    const updatedTask = {
      title: taskName,
      description: taskDesc,
      date: taskDate,
      completed: itemInfo.completed,
      key: itemInfo.key,
    };
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], ...updatedTask };
    try {
      const userCpy = { ...user, tasks: updatedData };
      await AsyncStorage.setItem("@user", JSON.stringify(userCpy));
    } catch (err) {
      console.error(err);
    }
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
            leftIcon={<BsCalendar color="#676477" style={{ marginRight: 5 }} />}
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
              onPress={type === "NEW" ? addNewTask : updateTask}
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
