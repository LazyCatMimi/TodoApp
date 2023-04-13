import * as React from "react";

import { StyleSheet } from "react-native";

import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import TaskScreen from "./components/TaskScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Task" component={TaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mainPAD = "5%";
const itemPAD = 15;
export const styles = StyleSheet.create({
  // containers
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#25282D",
    color: "#FFFFFF",
  },
  login: {
    alignItems: "center",
    backgroundColor: "#E7EAF1",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: "10%",
  },
  greeting: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#33383F",
  },
  topBar: {
    paddingVertical: itemPAD,
    paddingHorizontal: mainPAD,
  },
  mainArea: {
    paddingVertical: "2%",
    flex: 1,
    paddingHorizontal: mainPAD,
  },
  taskFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sortContainer: {
    backgroundColor: "#33383F",
    color: "white",
    width: "60%",
    borderRadius: 10,
    alignItems: "center",
  },
  floatingBox: {
    backgroundColor: "#25282D",
    padding: 20,
    borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(5,5,10,0.7)",
    zIndex: 998,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // texts
  whiteText: {
    color: "#FFFFFF",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
  },
  appTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  // list item
  listItem: {
    color: "#000000",
    backgroundColor: "#E7EAF1",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 2,
    padding: itemPAD,
    borderRadius: 10,
    alignItems: "center",
  },
  col2: {
    flexDirection: "row",
  },
  itemTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },
  crossText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  // buttons
  newTaskBtn: {
    backgroundColor: "#28B985",
    border: 0,
    padding: 10,
    borderRadius: 50,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 45,
  },
  backBtn: {
    zIndex: 2,
    position: "relative",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  // new task text input boxes
  input: {
    borderWidth: 0,
    padding: 10,
    backgroundColor: "#33383F",
    marginBottom: 20,
    marginTop: 10,
  },
  form: {
    flexDirection: "row",
  },
  // image
  icon: {
    width: 30,
    height: 30,
  },
});
