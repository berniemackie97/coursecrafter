import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

export default function NoCourses() {
    const router = useRouter()
  return (
    <View style={styles.MainView}>
      <Image
        style={styles.Image}
        source={require("./../../assets/images/book.png")}
      />
      <Text style={styles.Text}>You Dont Have Any Courses</Text>
      <Button text={"+ Create New Course"} onPress={()=>router.push('/addCourse')} />
      <Button text={"Explore Existing Courses"} type="outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  MainView: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
  },
  Text: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    textAlign: "center",
  },
  Image: {
    height: 200,
    width: 200,
  },
});
