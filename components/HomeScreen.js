import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import Constants from "expo-constants";
import { IoFilter, IoTrashOutline } from "react-icons/io5";

import { styles } from "../App";

export default function HomeScreen({ navigation }) {
  let initData = [
    {
      title: "Log in",
      description: "made an account and logged in",
      completed: true,
      key: "t1",
    },
    {
      title: "Get Started",
      description: "begin your task-managing journey",
      completed: false,
      key: "t2",
    },
    {
      title: "description is optional",
      description: "",
      completed: true,
      key: "t3",
    },
  ];
  let [data, setData] = useState(initData);

  let [taskName, setTaskName] = useState("");
  let [taskDesc, setTaskDesc] = useState("");
  let [showSettings, setShowSettings] = useState(false);
  let [showConfirmation, setShowConfirmation] = useState(true);

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
            style={[{ marginRight: 30 }]}
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
              item.description.length > 0 ? (
                <Text style={item.completed ? styles.crossText : undefined}>
                  {item.description}
                </Text>
              ) : undefined
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
                style={[styles.confirmButton, { backgroundColor: "black" }]}
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
                <Text style={styles.whiteText}>Confirm</Text>
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
        <TouchableOpacity
          style={[styles.newTaskBtn]}
          onPress={() => navigation.navigate("Task")}
        >
          <Text style={[styles.whiteText, styles.btnText]}>Create</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
