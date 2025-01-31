import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function Button({ text, type = "fill", onPress, loading = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.Button,
        type === "fill"
          ? { backgroundColor: Colors.PRIMARY }
          : { backgroundColor: Colors.WHITE },
      ]}
      disabled={loading}
    >
      {!loading ? (
        <Text
          style={[
            styles.Text,
            type === "fill"
              ? { color: Colors.WHITE }
              : { color: Colors.PRIMARY },
          ]}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size={"large"}
          color={type === "fill" ? Colors.WHITE : Colors.PRIMARY}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Button: {
    padding: 15,
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    marginTop: 15,
  },
  Text: {
    textAlign: "center",
    fontSize: 20,
  },
});
