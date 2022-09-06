import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../../firebase/db";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import useAuth from "../../auth";

export default function Login({ navigation }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const { signInWithGoogle } = useAuth();
  const dispatch = useDispatch();

  const emailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  return (
    <ImageBackground
      resizeMode="cover"
      source={{
        uri: "https://images.unsplash.com/photo-1601086330525-9e7d36dfe879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
      }}
      style={{ flex: 1, opacity: 0.8, }}
    >
      <View style={styles.container}>
        <Text style={styles.loginWelcome}>Welcome To Your Community</Text>
        <TextInput
          style={[styles.input, styles.shadow]}
          value={email}
          onChangeText={setEmail}
          placeholder="email"
        />
        <TextInput
          style={[styles.input, styles.shadow]}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry={true}
        />
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.registerButton, styles.shadow]}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Pressable style={[styles.loginButton, styles.shadow]} onPress={emailSignIn}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
        <Pressable onPress={signInWithGoogle}>
          <Image style={{ height: 10, borderRadius: 16 }} height={45} width={45} source={{ uri: "https://image.similarpng.com/very-thumbnail/2020/12/Google-modern-3D-icon-on-Premium-vector-PNG.png" }} />
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 200,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderRadius: 10,
    fontSize: 20,
    borderColor: "#009E78",
  },
  buttonRow: {
    flexDirection: "row",
  },
  loginButton: {
    backgroundColor: "tomato",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 15,
    borderRadius: 30,
  },
  registerButton: {
    backgroundColor: "#4f6cff",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
    fontFamily: 'Marker Felt',
  },
  loginWelcome: {
    fontSize: 35,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: 'Papyrus',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.45,
    elevation: 2,
  },
});
