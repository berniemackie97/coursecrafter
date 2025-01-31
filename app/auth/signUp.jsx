import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";
import Colors from "@/constants/Colors.jsx";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const RegisterAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user;
        // Save user to DB
        await CreateUserRecord(user);
      })
      .catch((error) => {
        let errorMessage = "An error occurred. Please try again.";

        // Handle specific Firebase Auth error codes
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = "This email is already in use. Please use a different email.";
            break;
          case 'auth/invalid-email':
            errorMessage = "The email address is not valid. Please enter a valid email.";
            break;
          case 'auth/weak-password':
            errorMessage = "The password is too weak. Please use a stronger password.";
            break;
          case 'auth/missing-email':
            errorMessage = "Please enter an email address.";
            break;
          case 'auth/missing-password':
            errorMessage = "Please enter a password.";
            break;
          default:
            errorMessage = error.message;
            break;
        }
        ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM)
      });
  };

  const CreateUserRecord = async (user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      createdDate: Timestamp.fromMillis(Date.now()),
      lastUpdatedDate: Timestamp.fromMillis(Date.now()),
      uid: user?.uid,
    };
    await setDoc(doc(db, "users", email), data);

    setUserDetail(data);
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
