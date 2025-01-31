import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import Colors from '@/constants/Colors.jsx'
import React from 'react'
import { useRouter } from 'expo-router';

export default function SignIn() {
    const router = useRouter();
  return (
    <View style={styles.mainView}>
      <Image
        style={styles.logo}
        source={require("./../../assets/images/logo.png")}
      />
      <Text style={styles.header}>Welcome Back!</Text>
      <TextInput placeholder="Email" style={styles.textInput} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.subView}>
        <Text style={{fontFamily: 'outfit'}}>Not signed up yet?</Text>
        <Pressable onPress={()=>router.push('/auth/signUp')}>
          <Text style={{color: Colors.PRIMARY, fontFamily: 'outfit-bold'}}>Register Here</Text>
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
    color: Colors.WHITE
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
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 20
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