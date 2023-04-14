import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../App";
export default function PopUp(props) {
  const { actionFunction, setShowConfirmation, message, confirmButtonColor } =
    props;
  return (
    <View style={styles.overlay}>
      <View style={styles.floatingBox}>
        <Text style={styles.sectionTitle}>{message}</Text>

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
              actionFunction();
              setShowConfirmation(false);
            }}
            style={[
              styles.confirmButton,
              { backgroundColor: confirmButtonColor },
            ]}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
