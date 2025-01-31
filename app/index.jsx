import Colors from "@/constants/Colors.jsx";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    setLoading(true);
    if (user) {
      console.log(user);
      const result = await getDoc(doc(db, "users", user?.email));
      setUserDetail(result.data());
      setLoading(false);
      router.replace("/(tabs)/home");
    }
    setLoading(false);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size={80} color={Colors.PRIMARY} />
        </View>
      )}
      <Image
        source={require("./../assets/images/landing.png")}
        style={{
          width: "100%",
          height: 300,
          marginTop: 70,
        }}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          Welcome to Course Crafter
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit",
            color: Colors.WHITE,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Leverage the power of AI to create custom courses on any topic at a
          click of a button
        </Text>

        {/* buttons */}
        <TouchableOpacity
          onPress={() => router.push("/auth/signUp")}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/auth/signIn")}
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,  // Make sure it's on top of all other elements
  },
});
