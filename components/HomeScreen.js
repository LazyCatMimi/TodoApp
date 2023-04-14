import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import Constants from "expo-constants";
import { IoFilter, IoTrashOutline } from "react-icons/io5";
import RadioGroup from "react-native-radio-buttons-group";
import RadioForm from "react-native-simple-radio-button";
import { styles } from "../App";

export default function HomeScreen({ navigation }) {
  let initData = [
    {
      title: "1. Log in",
      description: "made an account and logged in",
      date: "4/11/23",
      completed: true,
      key: "t1",
    },
    {
      title: "2. Get Started",
      description: "begin your task-managing journey",
      date: "4/12/23",
      completed: false,
      key: "t2",
    },
    {
      title: "3. description is optional",
      description: "",
      date: "",
      completed: false,
      key: "t3",
    },
  ];
  const radioButtonsData = [
    {
      label: "A↑",
      value: "aAsc",
    },
    {
      label: "A↓",
      value: "aDesc",
    },
    {
      label: "Date↑",
      value: "dateAsc",
    },
    {
      label: "Date↓",
      value: "dateDesc",
    },
  ];
  let [data, setData] = useState(initData);
  let [taskName, setTaskName] = useState("");
  let [taskDesc, setTaskDesc] = useState("");
  let [showSettings, setShowSettings] = useState(false);
  let [showConfirmation, setShowConfirmation] = useState(false);
  let [sortType, setSortType] = useState("aDesc");

  const addNewTask = () => {
    if (taskName.length > 0) {
      const newTask = {
        title: taskName,
        description: taskDesc,
        completed: false,
        key: `t${data.length + 1}`,
      };
      setData([newTask, ...data]);
    }
  };

  // function to sort
  useEffect(() => {
    let copy = [...data];
    let sortedData;
    switch (sortType) {
      case "aDesc":
        sortedData = copy.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "aAsc":
        sortedData = copy.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "dateDesc":
        sortedData = copy.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "dateAsc":
        sortedData = copy.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        sortedData = data;
    }
    setData(sortedData);
  }, [sortType]);

  const renderItem = ({ item }) => {
    // console.log(item.key)
    return (
      <View
        style={[
          styles.col2,
          styles.listItem,
          item.completed
            ? {
                opacity: 0.2,
              }
            : undefined,
        ]}
      >
        <View style={styles.col2}>
          {/* checkbox */}
          <CheckBox
            checked={item.completed}
            style={[{ padding: 0, margin: 0, marginRight: 30 }]}
            onPress={() => {
              let newData = [...data];
              newData[newData.indexOf(item)].completed = !item.completed;
              setData([...newData]);
            }}
          />
          {/* task info */}
          <View>
            <Text
              style={[
                styles.itemTitle,
                item.completed ? styles.crossText : undefined,
              ]}
            >
              {item.title}
            </Text>
            {
              // render description only if item has it
              item.description.length > 0 && (
                <Text style={item.completed ? styles.crossText : undefined}>
                  {item.description}
                </Text>
              )
            }
          </View>
        </View>
        {/* task options */}
        <Text>...</Text>
      </View>
    );
  };
  return (
    <>
      {showConfirmation && (
        <View style={styles.overlay}>
          <View style={styles.floatingBox}>
            <Text style={styles.sectionTitle}>Delete all completed Tasks?</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => setShowConfirmation(false)}
                style={[styles.confirmButton, { backgroundColor: "#25282D" }]}
              >
                <Text style={styles.whiteText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setData(data.filter((task) => !task.completed));
                  setShowConfirmation(false);
                }}
                style={[styles.confirmButton, { backgroundColor: "#28B985" }]}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <SafeAreaView style={[styles.container, { flex: 1 }]}>
        {/* user info top bar */}
        <View style={[styles.topBar, styles.greeting]}>
          <Text style={styles.whiteText}>Hello, UserName</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.whiteText}>logout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.mainArea}>
          {/* ---------form to create new task---------- */}
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: "center", color: "white", marginBottom: 5 },
            ]}
          >
            Create a New Task
          </Text>

          <Input
            placeholder="Task Name"
            style={styles.whiteText}
            onChangeText={(value) => setTaskName(value)}
          ></Input>
          <Input
            placeholder="Task Description... (optional)"
            style={styles.whiteText}
            onChangeText={(value) => setTaskDesc(value)}
          ></Input>
          <TouchableOpacity
            style={[
              styles.newTaskBtn,
              taskName.length == 0 ? { opacity: 0.2 } : { opacity: 1 },
            ]}
            onPress={addNewTask}
            disabled={taskName.length == 0 ? true : false}
          >
            <Text style={[styles.whiteText, styles.btnText]}>Create</Text>
          </TouchableOpacity>

          {/* ------------list of tasks --------*/}
          <View style={styles.taskFilterContainer}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            <TouchableOpacity
              onPress={() => setShowSettings(!showSettings)}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IoFilter size={30} />
              <Text style={{ color: "white", fontWeight: "bold" }}>Sort</Text>
            </TouchableOpacity>
          </View>

          {/* settings box for sorting and deleting */}
          {showSettings && (
            <View style={{ alignItems: "center" }}>
              <View style={styles.sortContainer}>
                {/* radio button for the sorting options */}
                <RadioForm
                  radio_props={radioButtonsData}
                  buttonColor={"white"}
                  labelColor={"white"}
                  selectedButtonColor={"white"}
                  selectedLabelColor={"white"}
                  buttonSize={15}
                  initial={0}
                  onPress={(value) => {
                    setSortType(value);
                  }}
                />
                {/* button to delete completed tasks */}
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => setShowConfirmation(true)}
                >
                  <IoTrashOutline size={20} />
                  <Text style={styles.whiteText}>Delete Completed Tasks</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <FlatList data={data} renderItem={renderItem} scrollEnabled={false} />
        </ScrollView>
        {/* <TouchableOpacity
          style={[styles.newTaskBtn]}
          onPress={() => navigation.navigate("Task")}
        >
          <Text style={[styles.whiteText, styles.btnText]}>Create</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
}
