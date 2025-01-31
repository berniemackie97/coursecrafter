import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Colors from "@/constants/Colors.jsx";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const RegisterAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user;
        console.log(user);
        // Save user to DB
        await CreateUserRecord(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const CreateUserRecord = async (user) => {
    await setDoc(doc(db, "users", email), {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    });
  };

  return (
    <View style={styles.mainView}>
      {/* Header Logo */}
      <Image
        style={styles.logo}
        source={require("./../../assets/images/logo.png")}
      />

      <Text style={styles.header}>Create New Account</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Full name"
        onChangeText={(value) => setFullName(value)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />

      {/* Buttons */}
      <TouchableOpacity onPress={RegisterAccount} style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.subView}>
        <Text style={{ fontFamily: "outfit" }}>Already have an acount?</Text>
        <Pressable onPress={() => router.push("/auth/signIn")}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}>
            Sign In Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    marginTop: 25,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "outfit",
    fontSize: 20,
    textAlign: "center",
    color: Colors.WHITE,
  },
  logo: {
    width: 180,
    height: 180,
  },
  mainView: {
    display: "flex",
    alignItems: "center",
    paddingTop: 80,
    padding: 25,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  subView: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
  },
  header: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});
