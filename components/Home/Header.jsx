import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "../../context/UserDetailContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View style={styles.HeaderMainView}>
      <View>
        <Text style={styles.WelcomeHeader}>Hello, {userDetail?.name}</Text>
        <Text style={styles.WelcomeSubHeader}>Lets Get Started!</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="settings" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderMainView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  WelcomeHeader: {
    fontFamily: "outfit-bold",
    fontSize: 28,
  },
  WelcomeSubHeader: {
    fontFamily: "outfit",
    fontSize: 18,
  },
});
