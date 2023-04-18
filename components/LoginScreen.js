import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const isFocused = useIsFocused();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");
  let [user, setUser] = useState("");
  useEffect(() => {
    async function getData() {
      const data = await AsyncStorage.getItem("@user");
      if (data != null) {
        setUser(JSON.parse(data));
      } else {
        console.log("no user data");
      }
    }
    getData();
  }, [isFocused]);

  const verify = () => {
    if (user.username == username && user.password == password) {
      setErr("");
      navigation.navigate("Home");
    } else {
      setErr("Incorrect username or password");
    }
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "20%",
        }}
      >
        <Text style={styles.appTitle}>MooTODO</Text>
      </View>

      <View style={[styles.login, { flex: 1 }]}>
        <Text
          style={[styles.sectionTitle, { color: "black", marginTop: "3em" }]}
        >
          Login
        </Text>
        <Input
          placeholder="username"
          testID="login-username"
          onChangeText={(value) => {
            setUsername(value);
          }}
          inputContainerStyle={[loginStyles.field, { marginTop: 20 }]}
        ></Input>

        <Input
          placeholder="password"
          testID="login-password"
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          inputContainerStyle={loginStyles.field}
        ></Input>
        <Text>{err}</Text>
        <TouchableOpacity
          style={loginStyles.button}
          testID="login-button"
          errorMessage={"noti"}
          onPress={verify}
        >
          <Text style={[styles.whiteText, { width: "4em" }]}>login</Text>
        </TouchableOpacity>

        <Text
          onPress={() => navigation.navigate("Register")}
          style={{ fontWeight: "bold" }}
        >
          or <Text style={{ color: "#4d8bff" }}>register</Text>
        </Text>
      </View>
    </View>
  );
}
const loginStyles = StyleSheet.create({
  field: {
    backgroundColor: "white",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderBottomColor: "#C3CDD9",
    borderBottomWidth: 4,
  },
  button: {
    backgroundColor: "#28B985",
    border: 0,
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 50,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
