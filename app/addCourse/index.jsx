import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Button from "../../components/Shared/Button";

export default function AddCourse() {

    const [loading, setLoading] = useState(false);
    const onGenerateTopic = () => {

    }

  return (
    <View style={styles.MainView}>
      <Text style={styles.HeaderText}>Create New Course</Text>
      <Text style={styles.SubHeaderText}>What do you want to learn today?</Text>
      <Text style={styles.ExampleText}>
        What course would you like to create (ex. Learn about Algebra, engines,
        Digital Marketing). Feel free to be descriptive and as specific as you
        want!
      </Text>
      <TextInput style={styles.Input} numberOfLines={3} multiline={true} placeholder="(Ex. Learn Digital Marketing Stategies, Learn Italian, etc)" />
      <Button text={'Generate Topic'} type="outline" onPress={()=>onGenerateTopic()} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  MainView: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  HeaderText: {
    fontFamily: "outfit-bold",
    fontSize: 30,
  },
  SubHeaderText: {
    fontFamily: "outfit",
    fontSize: 30,
  },
  ExampleText: {
    fontFamily: "outfit",
    fontSize: 18,
    marginTop: 8,
    color: Colors.GRAY,
  },
  Input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: 'flex-start',
    fontSize: 18
  },
  Button: {

  }
});
