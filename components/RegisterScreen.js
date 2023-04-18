import * as React from "react";
import { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, CheckBox } from "react-native-elements";
import { styles } from "../App";

export default function RegisterScreen({ navigation }) {
  // states for each field value
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [username, setUsername] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [email, setEmail] = useState("");
  let [zip, setZip] = useState("");
  let [newsletter, setNewsletter] = useState(false);

  // states for each field error
  let [firstNameErr, setFirstNameErr] = useState("");
  let [lastNameErr, setLastNameErr] = useState("");
  let [phoneErr, setPhoneErr] = useState("");
  let [passwordErr, setPasswordErr] = useState("");
  let [confirmPassErr, setConfirmPassErr] = useState("");
  let [emailErr, setEmailErr] = useState("");
  let [zipErr, setZipErr] = useState("");

  let [register, setRegister] = useState(true);
  const registerFunc = async () => {
    if (!register) {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        phoneNumber: phoneNumber,
        password: password,
        email: email,
        zip: zip,
        newsletter: newsletter,
        tasks: [],
      };
      await AsyncStorage.setItem("@user", JSON.stringify(newUser));
    }
    navigation.navigate("Login");
  };

  const updateButton = () => {
    const errorArray = [
      firstNameErr,
      lastNameErr,
      phoneErr,
      passwordErr,
      confirmPassErr,
      emailErr,
      zipErr,
    ];

    const inputArray = [
      firstName,
      lastName,
      username,
      phoneNumber,
      password,
      confirmPassword,
      email,
      zip,
    ];

    errorArray.every((err) => err.length == 0) &&
    inputArray.every((input) => input.length > 0)
      ? setRegister(false)
      : setRegister(true);
  };

  const validate = (type, value) => {
    const nameRegex = /^[^\d=?\\\/@#%^&*()]+$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const passwordRegex = [/[A-Z]+/, /[a-z]+/, /\d+/, /\W+/];
    const passwordMsgs = [
      "Error: Must contain at least 1 uppercase letter",
      "Error: Must contain at least 1 lowercase letter",
      "Error: Must contain at least 1 number",
      "Error: Must contain at least 1 non-alpha numberic character",
    ];
    const zipRegex = /^\d{5}$/;

    switch (type) {
      case "fname":
        setFirstName(value);
        value.match(nameRegex)
          ? setFirstNameErr("")
          : setFirstNameErr("Error: Name must only contain words or symbols");
        break;
      case "lname":
        value.match(nameRegex)
          ? setLastNameErr("")
          : setLastNameErr("Error: Name must only contain words or symbols");
        break;
      case "phone":
        value.match(phoneRegex)
          ? setPhoneErr("")
          : setPhoneErr("Error: Phone number must follow (xxx) xxx-xxxx");
        break;
      case "email":
        value.match(emailRegex)
          ? setEmailErr("")
          : setEmailErr("Error: Not a valid email");
        break;
      case "password":
        let errMsg = "";
        passwordRegex.every((regex, index) => {
          if (!value.match(regex)) {
            errMsg += `${passwordMsgs[index]}`;
          }
          return value.match(regex);
        })
          ? setPasswordErr("")
          : setPasswordErr(errMsg);
        confirmPassword != value && confirmPassword.length > 0
          ? setConfirmPassErr("Error: Password does not match")
          : setConfirmPassErr("");
        break;
      case "confirmPassword":
        value === password
          ? setConfirmPassErr("")
          : setConfirmPassErr("Error: Password does not match");
        break;
      case "zip":
        value.match(zipRegex)
          ? setZipErr("")
          : setZipErr("Error: ZIP must have exactly 5 numbers");
        break;
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "10%",
        }}
      >
        <Text style={styles.appTitle}>MooTODO</Text>
      </View>

      <View style={styles.login}>
        <Text
          style={[styles.sectionTitle, { color: "black", marginTop: "3em" }]}
        >
          Register
        </Text>
        <Text style={{ marginTop: 30 }}>Personal information</Text>
        <Input
          label="First Name"
          testID="firstname"
          inputContainerStyle={[loginStyles.field]}
          onChangeText={(value) => {
            setFirstName(value);
            validate("fname", value);
          }}
          errorMessage={firstNameErr}
          onBlur={updateButton}
        ></Input>

        <Input
          label="Last Name"
          testID="lastname"
          inputContainerStyle={loginStyles.field}
          onChangeText={(value) => {
            setLastName(value);
            validate("lname", value);
          }}
          errorMessage={lastNameErr}
          onBlur={updateButton}
        ></Input>

        <Input
          label="Phone Number"
          testID="phonenumber"
          placeholder="(xxx) xxx-xxxx"
          inputContainerStyle={loginStyles.field}
          onChangeText={(value) => {
            setPhoneNumber(value);
            validate("phone", value);
          }}
          errorMessage={phoneErr}
          onBlur={updateButton}
        ></Input>

        <Input
          label="Email"
          testID="email"
          inputContainerStyle={loginStyles.field}
          onChangeText={(value) => {
            setEmail(value);
            validate("email", value);
          }}
          errorMessage={emailErr}
          onBlur={updateButton}
        ></Input>

        <Input
          label="ZIP Code"
          testID="zip"
          inputContainerStyle={loginStyles.field}
          onChangeText={(value) => {
            setZip(value);
            validate("zip", value);
          }}
          errorMessage={zipErr}
          onBlur={updateButton}
        ></Input>

        <Text style={{ marginTop: 30 }}>Login information</Text>
        <Input
          label="Username"
          testID="username"
          inputContainerStyle={loginStyles.field}
          onChangeText={(value) => {
            setUsername(value);
            validate("username", value);
          }}
          onBlur={updateButton}
        ></Input>

        <Input
          label="Password"
          testID="password"
          inputContainerStyle={loginStyles.field}
          onChangeText={(value) => {
            setPassword(value);
            validate("password", value);
          }}
          secureTextEntry={true}
          errorMessage={passwordErr}
          onBlur={updateButton}
        ></Input>

        <Input
          label="Confirm Password"
          testID="confirmpassword"
          inputContainerStyle={loginStyles.field}
          onChangeText={(value) => {
            setConfirmPassword(value);
            validate("confirmPassword", value);
          }}
          secureTextEntry={true}
          errorMessage={confirmPassErr}
          onBlur={updateButton}
        ></Input>

        <CheckBox
          title="Sign up for Newsletter"
          label="Newsletter"
          testID="newsletter"
          checked={newsletter}
          onPress={() => setNewsletter(!newsletter)}
        ></CheckBox>

        <TouchableOpacity
          style={[
            loginStyles.button,
            register ? { opacity: 0.2 } : { opacity: 1 },
          ]}
          testID="login-register"
          disabled={register}
          onPress={registerFunc}
        >
          <Text style={[styles.whiteText, { width: "4em" }]}>Register</Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ fontWeight: "bold" }}
        >
          or <Text style={{ color: "#4d8bff" }}>login</Text>
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
