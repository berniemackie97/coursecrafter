import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import Colors from "@/constants/Colors.jsx";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user;
        console.log(user);
        await getUserDetail();
        setLoading(false);
        router.replace('/(tabs)/home')
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        ToastAndroid.show(
          "Incorrect Email/Password combination",
          ToastAndroid.BOTTOM
        );
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));
    console.log(result.data());
    setUserDetail(result.data());
  };

  return (
    <View style={styles.mainView}>
      <Image
        style={styles.logo}
        source={require("./../../assets/images/logo.png")}
      />
      <Text style={styles.header}>Welcome Back!</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        style={styles.textInput}
      />

      {/* Buttons */}
      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}
        style={styles.button}
      >
        {!loading ? (
          <Text style={styles.buttonText}>Sign In</Text>
        ) : (
          <ActivityIndicator size={"large"} color={Colors.WHITE} />
        )}
      </TouchableOpacity>

      <View style={styles.subView}>
        <Text style={{ fontFamily: "outfit" }}>Not signed up yet?</Text>
        <Pressable onPress={() => router.push("/auth/signUp")}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}>
            Register Here
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
